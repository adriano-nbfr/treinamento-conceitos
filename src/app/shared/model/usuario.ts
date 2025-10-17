export interface Usuario {
  id: string;
  nome: string;
  email: string;
  matricula: number;
  dataNascimento: string;
  dataCadastro: string;
  contatos?: ContatoUsuario[];
}

export interface ContatoUsuario {
  nome: string;
  telefone: string;
}
