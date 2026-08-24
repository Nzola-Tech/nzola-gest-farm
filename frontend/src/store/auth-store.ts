import { create } from "zustand";
import { persist, devtools } from "zustand/middleware"; // 1. Importado devtools aqui
import { Store } from "@tauri-apps/plugin-store";
import { invoke } from "@tauri-apps/api/core";

import { User } from "@/types/signup/index";
import { AuthResponse } from "@/types/login/inde";

interface AuthState {
  user: Pick<User, "id" | "username" | "role" | "status" | "name" | "surname" | "email"> | null;
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
  devtools( // 2. Devtools envelopando o persist por fora
    persist(
      (set) => ({
        user: null,
        loading: true,

        login: async (credentials) => {
          try {
            const authenticatedUser = await invoke<AuthResponse>("login", {
              input: {
                username: credentials.username,
                password: credentials.password,
              },
            });

            if (!authenticatedUser) {
              throw new Error("Usuário ou senha inválidos");
            }

            const userData = {
              id: authenticatedUser.user.id,
              username: authenticatedUser.user.username,
              name: authenticatedUser.user.name,
              surname: authenticatedUser.user.surname,
              role: authenticatedUser.user.role,
              status: authenticatedUser.user.status || "active",
              email: authenticatedUser.user.email,
            };

            const store = await getStore();
            await store.set("user", userData);
            await store.save();

            // 3. Adicionado o nome da ação 'auth/login'
            set({
              user: userData,
              loading: false,
            }, false, 'auth/login');

            return true;
          } catch (error) {
            console.error("Erro no login:", error);
            throw error;
          }
        },

        logout: async () => {
          const store = await getStore();

          await store.delete("user");
          await store.save();
          
          // 4. Adicionado o nome da ação 'auth/logout'
          set({ user: null, loading: false }, false, 'auth/logout');
        },

        checkAuth: async () => {
          const store = await getStore();
          const savedUser = await store.get<User>("user");

          // 5. Adicionado o nome da ação 'auth/checkAuth'
          set({ user: savedUser || null, loading: false }, false, 'auth/checkAuth');
        },
      }),
      {
        name: "auth-storage",
      },
    ),
    {
      name: "AuthStore", // 6. Nome customizado que aparecerá no menu do Redux DevTools
      //enabled: process.env.NODE_ENV !== 'production', // Desativa automaticamente em produção
    }
  ),
);
