import { create } from "zustand";
import Database from "@tauri-apps/plugin-sql";

import { fetchProducts } from "@/database";
import { Product } from "@/types/products";
import { User } from "@/types/signup";
import { getUsers } from "@/services/user/user.services";

interface DbState {
  db: Database | null;
  products: Product[];
  users: User[];
  initDb: () => Promise<void>;
  refreshProducts: () => Promise<void>;
  refreshUsers: () => Promise<void>;
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
  users: [],

  initDb: async () => {
    const db = await getDbInstance();
    const allProducts = await fetchProducts(db);
    const allUsers = await getUsers(db);

    set({ db, products: allProducts, users: allUsers });
  },

  refreshProducts: async () => {
    const { db } = get();

    if (!db) return;

    const allProducts = await fetchProducts(db);

    set({ products: allProducts });
  },
  refreshUsers: async () => {
    const { db } = get();

    if (!db) return;

    const allUsers = await getUsers(db);

    set({ users: allUsers });
  },
}));
