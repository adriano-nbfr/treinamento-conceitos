export function obterItensFiltrados<T>(itens: readonly T[], texto: string | null | undefined) {
  if (!texto)
    return itens;

  texto = texto.toLowerCase();
  return itens.filter(a => JSON.stringify(a).toLowerCase().includes(texto));
}
