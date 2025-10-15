import { HttpErrorResponse } from "@angular/common/http";
import { TimeoutError, throwError } from "rxjs";


// Mapeia os códigos de erro HTTP para mensagens amigáveis.
const MENSAGENS_ERRO_API: Record<number, string> = {
  400: 'O formato da requisição não é válido.',
  401: 'O acesso ao recurso solicitado não foi autorizado.',
  403: 'O acesso ao recurso solicitado não é permitido.',
  404: 'O recurso solicitado não foi encontrado.',
  405: 'O método usado na requisição não é permitido.',
  408: 'O tempo de espera da requisição se esgotou. Tente novamente.',
  413: 'O dado enviado excedeu o limite definido pelo servidor.',
  414: 'O comprimento da URI da requisição excedeu o limite suportado pelo servidor.',
  415: 'O formato de mídia do dado enviado não é suportado pelo servidor.',
  422: 'Os dados enviados não estão adequados ao processamento.',
};


/**
 * Classe que representa um erro amigável originado pelo tratamento de uma requisição HTTP mal sucedida.
 */
export class ErroHttpTratado extends Error {
  /** O código de status HTTP do erro */
  status: number;

  /** A url de destino da requisição */
  url: string | null | undefined;

  /** O erro retornado pelo response, ou `undefined` no caso de não haver response. */
  error?: any;

  constructor(
    mensagem: string,
    opcoes: {
      status: number,
      url?: string | null,
      error?: any
    }) {

    super(mensagem);
    this.name = 'ErroHttpTratado'; // Importante para identificação apropriada
    this.url = opcoes.url;
    this.status = opcoes.status;
    this.error = opcoes.error;

    // Essencial para verificação correta comm instanceof
    Object.setPrototypeOf(this, ErroHttpTratado.prototype);
  }
}



/**
 * Retorna uma mensagem tratada a partir de um erro resultante de uma requisição http.
 * @param error - O objeto com o erro resultante da requisição.
 */
export function tratarMensagemErroResponse(error: HttpErrorResponse) {
  const msgTenteNovamente =  'Tente novamente em alguns instantes.';
  let mensagem = '';

  if (error instanceof TimeoutError)
    mensagem = `O tempo de espera da requisição se esgotou. ${msgTenteNovamente}`;
  else if (error.status === 0)
    mensagem = `A requisição não alcançou ou não obteve resposta do host. ${msgTenteNovamente}`;
  else if (error.status >= 400 && error.status < 500)
    mensagem = MENSAGENS_ERRO_API[error.status];
  else if (error.status >= 500 && error.status < 600) {
    const erroMsg = (error.error?.message || error.message || '').trim();
    mensagem = erroMsg && !erroMsg.toLowerCase().startsWith('http failure')
      ? erroMsg
      : `Ocorreu um erro interno. ${msgTenteNovamente}`;
  }

  if (!mensagem && isErroSintaxe(error))
    mensagem = 'A resposta da requisição veio em um formato inesperado.';

  return mensagem || `Ocorreu um erro ao processar a requisição. ${msgTenteNovamente}`;
}


/**
 * Retorna um novo objeto de erro como Observable com uma mensagem amigável tratada,
 * a partir do erro original resultante de uma requisição http.
 * @param error - O objeto com o erro original resultante da requisição.
 */
export const erroResponseTratado = (error: HttpErrorResponse) => {
  return throwError(() => new ErroHttpTratado(
    tratarMensagemErroResponse(error),
    {
      status: error.status ?? 0,
      url: error.url,
      error: error.error || undefined
    }
  ));
};


function isErroSintaxe(error: HttpErrorResponse) {
  return error.error?.error instanceof SyntaxError ||
    (error.message || '').toLowerCase().startsWith('http failure during parsing');
}

