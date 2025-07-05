import Database from "@tauri-apps/plugin-sql";

export const MIN_STOCK = 10;

export interface Product {
  id?: number; // Optional, since it's usually auto-generated
  name: string;
  barcode?: string; 
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
  deleted: number;
}

export const initialState: Product = {
  name: "",
  barcode: "",
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
  deleted: 0
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
    onOpenInventory?: () => void;
}

export interface EditProductProps  {
    product: Product;
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
    db: any;
    onProductChange: () => void;
    onClose: () => void;
};