import { HttpParams } from "@angular/common/http";
import { EstrategiaPaginacao, OrdenacaoDados } from "./estrategia-paginacao";
import { PaginacaoInfo, PaginaDados } from "./pagina-dados";

const ATRIBUTO_HATEOAS_EMBEDDED = '_embedded';
const ATRIBUTO_HATEOAS_PAGE = 'page';
const ATRIBUTO_PAGE_CONTENT = 'content';
const ATRIBUTO_PAGE_NUMBER = 'number';
const ATRIBUTO_PAGE_SIZE = 'size';
const ATRIBUTO_PAGE_TOTAL_ELEMENTS = 'totalElements';
const ATRIBUTO_PAGE_TOTAL_PAGES = 'totalPages';


/**
 * Define os detalhes específicos de uma consulta com paginação que faz uma requisição
 * a uma api restful que implementa uma paginação convencional usando o framework Spring no Java.
 */
export class EstrategiaPaginacaoSpring<T = unknown> extends EstrategiaPaginacao<T> {

  override montarParametrosRequest(
    pagina?: number,
    tamanhoPagina?: number,
    ordenacao?: OrdenacaoDados
  ): HttpParams {

    let params = new HttpParams();

    if (pagina != undefined)
      params = params.set('page', (pagina-1).toString());

    if (tamanhoPagina != undefined)
      params = params.set('size', tamanhoPagina.toString());

    if (!ordenacao)
      return params;

    const atributo = (typeof ordenacao === 'string' ? ordenacao : ordenacao.atributo);
    const sentido = (typeof ordenacao === 'string' ? 'asc' : (ordenacao.sentido ?? 'asc'));
    const sort = `${atributo},${sentido}`;
    params = params.set('sort', sort);

    return params;
  }


  override montarPaginaResultado(response: any): PaginaDados<T> {
    if (!response)
      return { dados: [] };

    if (Array.isArray(response))
      return { dados: response };

    if (ATRIBUTO_HATEOAS_PAGE in response && ATRIBUTO_HATEOAS_EMBEDDED in response)
      return this.extrairPaginaSpringHateoasPageModel(response);

    return this.extrairPaginaSpringPageContent(response);
  }


  private extrairPaginaSpringPageContent(response: any) {
    const dados = response[ATRIBUTO_PAGE_CONTENT] as T[] ?? [];

    const pageInfo = ATRIBUTO_PAGE_SIZE in response && ATRIBUTO_PAGE_NUMBER in response
      ? {
          pagina: response[ATRIBUTO_PAGE_NUMBER] + 1,
          tamanhoPagina: response[ATRIBUTO_PAGE_SIZE],
          totalPaginas: response[ATRIBUTO_PAGE_TOTAL_PAGES],
          totalRegistros: response[ATRIBUTO_PAGE_TOTAL_ELEMENTS],
          quantidadeItens: dados.length
        } as PaginacaoInfo
      : undefined;

    return { info: pageInfo, dados } as PaginaDados<T>;
  }


  private extrairPaginaSpringHateoasPageModel(response: any) {
    const atributoEmbedded = response[ATRIBUTO_HATEOAS_EMBEDDED];
    const dados = atributoEmbedded
      ? (Object.values(atributoEmbedded).at(0) ?? []) as T[]
      : [];

    const atributoPage = response[ATRIBUTO_HATEOAS_PAGE];
    const pageInfo = atributoPage
      ? {
          pagina: atributoPage[ATRIBUTO_PAGE_NUMBER] + 1,
          tamanhoPagina: atributoPage[ATRIBUTO_PAGE_SIZE],
          totalPaginas: atributoPage[ATRIBUTO_PAGE_TOTAL_PAGES],
          totalRegistros: atributoPage[ATRIBUTO_PAGE_TOTAL_ELEMENTS],
          quantidadeItens: dados.length
        } as PaginacaoInfo
      : undefined;

    return { info: pageInfo, dados: dados } as PaginaDados<T>;
  }

}
