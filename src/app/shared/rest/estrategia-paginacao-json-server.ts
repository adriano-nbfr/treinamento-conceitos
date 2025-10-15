import { HttpParams } from "@angular/common/http";
import { EstrategiaPaginacao, OrdenacaoDados } from "./estrategia-paginacao";
import { PaginacaoInfo, PaginaDados } from "./pagina-dados";

const ATRIBUTO_PAGE_CONTENT = 'data';
const ATRIBUTO_PAGE_TOTAL_ELEMENTS = 'items';
const ATRIBUTO_PAGE_TOTAL_PAGES = 'pages';
const ATRIBUTO_PAGE_NEXT = 'next';
const ATRIBUTO_PAGE_PREV = 'prev';


/**
 * Define os detalhes específicos de uma consulta com paginação que faz uma requisição
 * a uma api restful fornecida pela ferramenta de mock Json Server.
 */
export class EstrategiaPaginacaoJsonServer<T = unknown> extends EstrategiaPaginacao<T> {

  override montarParametrosRequest(
    pagina?: number,
    tamanhoPagina?: number,
    ordenacao?: OrdenacaoDados
  ): HttpParams {

    let params = new HttpParams();

    if (pagina != undefined)
      params = params.set('_page', pagina.toString());

    if (tamanhoPagina != undefined)
      params = params.set('_per_page', tamanhoPagina.toString());

    if (!ordenacao)
      return params;

    const atributo = (typeof ordenacao === 'string' ? ordenacao : ordenacao.atributo);
    const sentido = (typeof ordenacao === 'string' ? 'asc' : (ordenacao.sentido ?? 'asc'));
    const sort = `${sentido == 'desc' ? '-' : ''}${atributo}`;
    params = params.set('_sort', sort);

    return params;
  }


  override montarPaginaResultado(response: any): PaginaDados<T> {
    if (!response)
      return {
        dados: []
      };

    if (Array.isArray(response))
      return { dados: response };

    return this.extrairPaginaPeloResponse(response);
  }


  private extrairPaginaPeloResponse(response: any) {
    const dados = response[ATRIBUTO_PAGE_CONTENT] as T[] ?? [];

    let pageInfo: Partial<PaginacaoInfo> | undefined = undefined;

    // Tenta obter os metadados de paginação
    if (ATRIBUTO_PAGE_TOTAL_PAGES in response && ATRIBUTO_PAGE_TOTAL_ELEMENTS in response) {
      const proxima = response[ATRIBUTO_PAGE_NEXT];
      const anterior = response[ATRIBUTO_PAGE_PREV];
      const totalPaginas = response[ATRIBUTO_PAGE_TOTAL_PAGES];
      const totalRegistros = response[ATRIBUTO_PAGE_TOTAL_ELEMENTS];
      const quantidadeItens = dados.length;

      // Na versão corrente do json-server, o número e tamanho da página não são retornados nos metatados (vai entender...).
      // Logo será feito o possível para determiná-los a partir dos demais dados disponíveis
      const pagina = anterior != undefined ? anterior + 1 : (proxima ? proxima - 1 : 1);

      const tamanhoPagina = proxima != undefined
        ? quantidadeItens // se esta não for última página, o tamanho da página é a própria quantidade exibida
        : totalPaginas > 1 // caso contrário, determina o tamanho quando houver mais de uma página
          ? Math.floor(totalRegistros - quantidadeItens) / (totalPaginas - 1)
          : undefined; // Não há como determinar o tamanho da página pela resposta

      pageInfo = {
        pagina,
        tamanhoPagina,
        totalPaginas,
        totalRegistros,
        quantidadeItens
      };
    }

    return { info: pageInfo, dados: dados } as PaginaDados<T>;
  }

}
