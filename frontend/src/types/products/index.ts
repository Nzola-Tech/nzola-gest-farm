export type Produto = {
  nome: string;
  descricao: string;
  fabricante: string;
  registroAnvisa: string;
  lote: string;
  dataValidade: string;
  quantidadeEstoque: number;
  precoVenda: number;
  precoCusto: number;
  controlado: boolean;
  prescricaoObrigatoria: boolean;
  categoria: string;
  formaFarmaceutica: string;
};

export interface AddProductProps {
  product: Produto;
  setProduct: React.Dispatch<React.SetStateAction<Produto>>;
}