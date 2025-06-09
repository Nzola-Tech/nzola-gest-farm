import { Product } from "../products";

export type PdvProps = {
  products: Product[];
  db: any;
  onSaleComplete?: () => void;
};

export type CartItem = {
  id: number;
  name: string;
  sale_price: number;
  quantity : number;
};


export const paymentOptions = [
  { label: "Dinheiro", value: "dinheiro" },
  { label: "Cartão", value: "cartao" },
  { label: "Crédito", value: "credito" },
];