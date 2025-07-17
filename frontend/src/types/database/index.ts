import Database from "@tauri-apps/plugin-sql";

import { Product } from "../products";

export type DbContextType = {
  db: Database | null;
  products: Product[];
  refreshProducts: () => Promise<void>;
};
