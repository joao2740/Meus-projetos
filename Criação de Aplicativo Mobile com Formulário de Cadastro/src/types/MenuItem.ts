// Tipo para representar um item do cardápio
export interface MenuItem {
  nome: string;
  preco: string;
  descricao: string;
}

// Tipo para os erros de validação
export interface FormErrors {
  nome?: string;
  preco?: string;
  descricao?: string;
}
