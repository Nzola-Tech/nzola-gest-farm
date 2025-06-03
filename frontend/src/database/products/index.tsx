import Database from "@tauri-apps/plugin-sql";
import { Product } from "../../types/products";

export async function fetchProducts(db: Database | null): Promise<Product[]> {
    const result = await db?.select("SELECT * FROM products");
    return result as Product[];
}