import { HttpParams } from "@angular/common/http";
import { PaginaDados } from "./pagina-dados";


export type OrdenacaoDados = string | { atributo: string, sentido?: 'asc' | 'desc' };

/**
 * Uma classe que deve ser estendida para implementar os detalhes específicos
 * de uma consulta com paginação por meio de uma a requisição a uma api restful.
 */
export abstract class EstrategiaPaginacao<T = unknown> {

  /**
   * Retorna um objeto do tipo `HttpParams`, montado com base nos parâmetros fornecidos.
   * @param pagina - O número da página consultada (opcional).
   * @param tamanhoPagina - O número máximo de registros exibidos por página (opcional).
   * @param ordenacao - Um objeto que define a ordenação desejada (opcional).
   */
  abstract montarParametrosRequest(
    pagina?: number,
    tamanhoPagina?: number,
    ordenacao?: OrdenacaoDados
  ): HttpParams;


  /**
   * Retorna, a partir de um objeto JSON resultante da resposta à uma requisição,
   * um objeto `PaginaDados` contendo o resultado tratado (dados e informação de paginação).
   * @param response - O objeto resultante da resposta à requisição.
   */
  abstract montarPaginaResultado(response: any): PaginaDados<T>;

}
