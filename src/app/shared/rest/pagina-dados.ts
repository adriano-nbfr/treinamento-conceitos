/** Representa alguns metadados associados a uma página específica de um conjunto maior de dados. */
export interface PaginacaoInfo {
  /** O número da página corrente (iniciando em 1). */
  pagina: number;

  /** O número máximo de registros exibidos por página. */
  tamanhoPagina: number;

  /** A quantidade de registros contida na página corrente. */
  quantidadeItens: number;

  /** O número total de registros na origem dos dados. */
  totalRegistros: number;

  /** O número total de páginas que comporta todos os dados, considerando o tamanho da página.
   * Quando ausente, ainda pode ser determinado pelos demais atributos. (opcional) */
  totalPaginas?: number;
}


/** Representa o resultado tratado (dados e informação de paginação) de uma consulta
 * paginada feita por meio de uma requisição a uma Api Restful. */
export interface PaginaDados<T> {
  /** O objeto contendo os metadados da página. */
  info?: Partial<PaginacaoInfo>;

  /** Um array com os registros da página. */
  dados: readonly T[];
}
