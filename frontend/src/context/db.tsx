import { fetchProducts } from "@/database";
import { DbContextType } from "@/types/database";
import { Product } from "@/types/products";
import Database from "@tauri-apps/plugin-sql";
import { createContext, useEffect, useState } from "react";

export const DbContext = createContext<DbContextType>({
    db: null,
    products: [],
    refreshProducts: async () => {}
});

export const DbProvider = ({ children }: { children: React.ReactNode }) => {
    const [db, setDb] = useState<Database | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
1   
    useEffect(() => {
        const initDb = async () => {
            const database = await Database.load("sqlite:ngf.db")
            setDb(database);
            const allProducts = await fetchProducts(database);
            setProducts(allProducts);
        }
        initDb()
    }, []);
    const refreshProducts = async () => {
        if (db) {
            const allProducts = await fetchProducts(db);
            setProducts(allProducts);
        }
    };
    return (
        <>
            <DbContext.Provider value={{ db, products, refreshProducts }}>
                {children}
            </DbContext.Provider>
        </>
    )
}