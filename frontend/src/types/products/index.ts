import Database from "@tauri-apps/plugin-sql";

/* export type Product = {
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
 */
export interface Product {
  id?: number; // Optional, since it's usually auto-generated
  name: string;
  description: string;
  manufacturer: string;
  expiration_date: string; // ISO format: 'YYYY-MM-DD'
  stock_quantity: number;
  sale_price: number;
  cost_price: number;
  controlled?: boolean;
  prescription_required: boolean;
  category: string;
  pharmaceutical_form?: string;
  created_at: string; // ISO format: 'YYYY-MM-DDTHH:mm:ssZ'
  updated_at: string; // ISO format
}

export const initialState: Product = {
  name: "",
  description: "",
  manufacturer: "",
  expiration_date: "",
  stock_quantity: 0,
  sale_price: 0,
  cost_price: 0,
  controlled: false,
  prescription_required: false,
  category: "",
  pharmaceutical_form: "",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export interface AddProductProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  db : Database | null;
  onProductChange?: () => void;
  onClose?: () => void;
}

export interface allProductsProps { 
    products: Product[];
    setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
    db: Database | null;
    onProductChange?: () => void;
}

export interface EditProductProps  {
    product: Product;
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
    db: any;
    onProductChange: () => void;
    onClose: () => void;
};