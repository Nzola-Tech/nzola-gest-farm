import { create } from "zustand";
import Database from "@tauri-apps/plugin-sql";
import { fetchProducts } from "@/database";
import { Product } from "@/types/products";

interface DbState {
  db: Database | null;
  products: Product[];
  initDb: () => Promise<void>;
  refreshProducts: () => Promise<void>;
}

let dbInstance: Database | null = null;
const getDbInstance = async () => {
  if (!dbInstance) {
    dbInstance = await Database.load("sqlite:ngf.db");
  }
  return dbInstance;
};

export const useDbStore = create<DbState>((set, get) => ({
  db: null,
  products: [],

  initDb: async () => {
    const db = await getDbInstance();
    const allProducts = await fetchProducts(db);

    set({ db, products: allProducts });
  },

  refreshProducts: async () => {
    const { db } = get();
    if (!db) return;

    const allProducts = await fetchProducts(db);
    set({ products: allProducts });
  },
}));
