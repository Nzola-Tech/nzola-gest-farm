import { Product } from "../products";

export type PDVProps = {
  products: Product[];
  db: any;
  onSaleComplete: () => void;
};

export type CartItem = Product & { quantity: number };

export const paymentOptions = [
  { label: "Dinheiro", value: "dinheiro" },
  { label: "Cartão", value: "cartao" },
  { label: "Convênio", value: "convenio" },
];