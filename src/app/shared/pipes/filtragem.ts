export function obterItensFiltrados<T>(itens: readonly T[], texto?: string | null) {
  if (!texto)
    return itens;

  texto = texto.toLowerCase();
  return itens.filter(a => Object.values(a as object).join('#').toLowerCase().includes(texto));
}
