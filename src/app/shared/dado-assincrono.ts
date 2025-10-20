import { signal, ValueEqualityFn, WritableSignal } from "@angular/core";
import { catchError, defer, finalize, Observable, of, OperatorFunction, tap, throwError } from "rxjs";

/**
 * Representa um dado obtido de maneira assíncrona, juntamente com seu estado (ocupado e erro).
 * Signals independentes são usados para que o estado (ocupado e erro) possa ser alterado sem
 * sinalizar mudanças para eventuais consumidores do valor corrente se este último não tiver mudado.
 */
export interface DsDadoAssincrono<T> {
  /** Um signal que armazena o valor corrente do dado assíncrono. */
  readonly valor: WritableSignal<T>;

  /** Um signal que armazena o status de ocupado (`true / false`) e uma eventual mensagem de erro ao obter o dado. */
  readonly status: WritableSignal<{
    /** Indica se um processamento assíncrono envolvendo o dado está ocorrendo. */
    ocupado: boolean;

    /** Uma eventual mensagem de erro obtida na última vez em que o dado foi processado. */
    erro?: string;
  }>;
}


/**
 * Retorna uma nova instância de `DsDadoAssincrono`
 * @param valor - Um valor inicial para o dado assíncrono
 * @param equalFn - Uma função customizada para definir a igualdade entre dois valores (opcional)
 *
 * @example
 * itens = dadoAssincrono<Item[]>([]); // Inicializa um dadoAssincrono que armazena um array do tipo Item
 */
export function dadoAssincrono<T>(valor: T, equalFn?: ValueEqualityFn<T>): DsDadoAssincrono<T> {
  const signalOptions = equalFn ? {equal: equalFn} : undefined;

  return {
    valor: signal(valor, signalOptions),
    status: signal({
      ocupado: false
    }),
  } as DsDadoAssincrono<T>;
}


/**
 * Reseta o valor e o status de um objeto `DsDadoAssincrono`
 * @param dadoAssincrono - O objeto a ser resetado
 * @param valor - O novo valor para o dado assincrono
 */
export function dadoAssincronoReset<T>(dadoAssincrono: DsDadoAssincrono<T>, valor: T): void {
  dadoAssincrono.valor.set(valor);
  dadoAssincrono.status.set({ocupado: false});
}


////////////////////////////////////////////////////////////


/**
 * Operator que manipula um objeto `DsDadoAssincrono` para refletir o estado da execução de um observable.
 * @param dadoAssincrono - O objeto cujo valor e status serão atualizados durante o processamento.
 * @param valorErro - Se especificado, usa este valor em caso de erro e suprime a exceção. (opcional)
 * @param ocupadoAteCompletar - Quando o observable fonte emitir múltiplos valores, determina se
 * o status de ocupado permanece como `true` até que o observable complete, ou deve ser
 * restaurado para `false` quando o primeiro valor for emitido. (default = false)
 *
 * @example
 * itens = dadoAssincrono<Item[]>([]); // inicializa o dadoAssincrono
 * ...
 * // itens.status().ocupado será true até que a requisição responda com os dados ou com erro (itens.status().erro).
 * // Ao final, itens.valor() conterá os itens carregados ou, neste exemplo, um array vazio em caso de falha.
 * this.http.get('api/itens').pipe(
 *   mapearDadoAssincrono(itens, []) // mapeia valor e status no dadoAssincrono 'itens'
 * ).subscribe();
 */
export function mapearDadoAssincrono<T>(
  dadoAssincrono: DsDadoAssincrono<T>,
  valorErro?: T,
  ocupadoAteCompletar = false): OperatorFunction<T, T> {

  return (source: Observable<T>) => defer(() => {
    // A cada execução por uma nova subscription, reseta o status do dadoAssincrono
    dadoAssincrono.status.set({ ocupado: true, erro: undefined });

    return source.pipe(
      tap(v => {
        dadoAssincrono.valor.set(v); // em caso de sucesso, altera o valor

        if (!ocupadoAteCompletar)
          dadoAssincrono.status.set({ ocupado: false, erro: undefined });
      }),
      catchError((error: any) => {
        const msgErro = error?.error?.message || error?.message ||
          'Ocorreu um erro não identificado no processamento';

        if (valorErro !== undefined) // usa o valor de fallback, quando fornecido
          dadoAssincrono.valor.set(valorErro);

        dadoAssincrono.status.set({ ocupado: false, erro: msgErro });

        return valorErro !== undefined
          ? of(valorErro) // o erro não se propaga se um valor de fallback tiver sido fornecido
          : throwError(() => new Error(msgErro));
      }),
      finalize(() => {
        // garante que o status de ocupado volte pra false caso seja cancelado antes de emitir um valor
        if (dadoAssincrono.status().ocupado)
          dadoAssincrono.status.update(status => ({ ...status, ocupado: false }));
      })
    );
  });
}


////////////////////////////////////////////////////////////


/**
 * Função que manipula um objeto `DsDadoAssincrono` para refletir o estado do processamento de uma promise.
 * @param promise - Uma promise, ou uma função que retorna uma promise cujo processamento será refletido.
 * @param dadoAssincrono - O objeto cujo valor e status serão atualizados durante o processamento.
 * @param valorErro - Se especificado, usa este valor em caso de erro e suprime a exceção. (opcional)
 *
 * @example
 * itens = dadoAssincrono<Item[]>([]); // inicializa o dadoAssincrono
 * ...
 * // itens.status().ocupado será true até que a requisição responda com os dados ou com erro (itens.status().erro).
 * // Ao final, itens.valor() conterá os itens carregados ou, neste exemplo, um array vazio em caso de falha.
 * resolverDadoAssincrono(fetch('api/itens'), itens, []); // mapeia valor e status no dadoAssincrono 'itens'
 */
export function resolverDadoAssincrono<T>(
  promise: Promise<T> | (() => Promise<T>),
  dadoAssincrono: DsDadoAssincrono<T>,
  valorErro?: T): void {

  (async () => {
    dadoAssincrono.status.set({ ocupado: true, erro: undefined });

    try {
      const valor = (typeof promise === 'function')
        ? await promise()
        : await promise;

      dadoAssincrono.valor.set(valor);
      dadoAssincrono.status.set({ ocupado: false, erro: undefined });
    }
    catch (error: any) {
      const msgErro = error?.error?.message || error?.message ||
        'Ocorreu um erro não identificado no processamento';

      dadoAssincrono.status.set({ ocupado: false, erro: msgErro });

      if (valorErro === undefined)
        throw new Error(msgErro);

      dadoAssincrono.valor.set(valorErro);
    }
  })();
}
