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
  415: 'O formato de mídia do dado enviado não é suportado pelo servidor.',
};


/**
 * Retorna uma mensagem tratada a partir de um erro resultante de uma requisição http.
 * @param error - O objeto com o erro resultante da requisição.
 */
export function tratarMensagemErroResponse(error: HttpErrorResponse) {
  let mensagem = '';

  if (error instanceof TimeoutError)
    mensagem = 'O tempo de espera da requisição se esgotou. Tente novamente.';
  else if (error.status === 0)
    mensagem = 'A requisição não alcançou o host de destino.';
  else if (error.status >= 400 && error.status < 500)
    mensagem = MENSAGENS_ERRO_API[error.status];
  else if (error.status >= 500 && error.status < 600) {
    const erroMsg = (error.error?.message || error.message || '').trim();
    mensagem = erroMsg && !erroMsg.toLowerCase().startsWith('http failure')
      ? erroMsg
      :'Ocorreu um erro interno. Tente novamente';
  }

  if (!mensagem && isErroSintaxe(error))
    mensagem = 'A resposta da requisição veio em um formato inesperado.';

  return mensagem || 'Ocorreu um erro ao processar a requisição. Tente novamente.';
}


/**
 * Retorna um novo objeto de erro com uma mensagem amigável tratada,
 * a partir do erro original resultante de uma requisição http.
 * @param error - O objeto com o erro original resultante da requisição.
 */
export const erroResponseTratado = (error: HttpErrorResponse) => {
  const mensagem = tratarMensagemErroResponse(error);
  return throwError(() => new Error(mensagem));
};


function isErroSintaxe(error: HttpErrorResponse) {
  return error.error?.error instanceof SyntaxError ||
    (error.message || '').toLowerCase().startsWith('http failure during parsing');
}
