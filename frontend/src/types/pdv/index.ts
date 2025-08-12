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
  quantity: number;
};

export const paymentOptions = [
  { key: "dinheiro", value: "Dinheiro" },
  { key: "cartão", value: "Cartão" },
  { key: "crédito", value: "Crédito" },
];

export interface SellFormProps {
  onEditQuantity: (productId: number, quantity: number) => void;
  confirmPrint?: () => void;
}
