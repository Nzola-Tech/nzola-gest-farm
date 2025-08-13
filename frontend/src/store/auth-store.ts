import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Store } from "@tauri-apps/plugin-store";

import { useDbStore } from "./db-store";

export interface User {
  username: string;
  password?: string;
  role?: "admin" | "farmaceutico" | "farmaceutica";
}

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (userData: User) => Promise<void | boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

let storeInstance: Store | null = null;
const getStore = async () => {
  if (!storeInstance) {
    storeInstance = await Store.load(".auth.dat");
  }

  return storeInstance;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,

      login: async (userData) => {
        const db = useDbStore.getState().db;

        if (!db) throw new Error("Banco de dados não inicializado");

        const user = await db.select<User[]>(
          "SELECT * FROM users WHERE username = ? AND password = ?",
          [userData.username, userData.password],
        );

        if (user.length === 1) {
          const store = await getStore();

          await store.set("user", {
            username: user[0].username,
            role: user[0].role,
          });
          await store.save();
          set({
            user: { username: user[0].username, role: user[0].role },
            loading: false,
          });

          return true;
        } else {
          throw new Error("Usuário ou senha inválidos");
        }
      },

      logout: async () => {
        const store = await getStore();

        await store.delete("user");
        await store.save();
        set({ user: null, loading: false });
      },

      checkAuth: async () => {
        const store = await getStore();
        const savedUser = await store.get<User>("user");

        set({ user: savedUser || null, loading: false });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
