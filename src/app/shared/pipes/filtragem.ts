export function obterItensFiltrados<T>(itens: T[], texto?: string | null) {
  if (!texto)
    return itens;

  texto = texto.toLowerCase();
  return itens.filter(a => JSON.stringify(a).toLowerCase().includes(texto));
}
