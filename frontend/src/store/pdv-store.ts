import { create } from "zustand";
import { Selection } from "@heroui/table";
import { CartItem, paymentOptions } from "@/types/pdv";

interface PdvState {
  cart: CartItem[];
  payment: string;
  selectedKeys: Selection;
  addToCart: (product: CartItem) => void;
  changePayment: (option: string) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  setSelectedKeys: (keys: Selection) => void;
  setCart: (cart: CartItem[]) => void;
}

export const usePdvStore = create<PdvState>((set) => ({
  cart: [],
  payment: paymentOptions[0].value,
  selectedKeys: new Set([]),

  addToCart: (product) =>
    set((state) => {
      const exists = state.cart.find((item) => item.id === product.id);

      if (exists) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const newKeys = new Set(state.selectedKeys);
      newKeys.delete(String(id));

      return {
        cart: state.cart.filter((item) => item.id !== id),
        selectedKeys: newKeys,
      };
    }),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      ),
    })),

  changePayment: (option) => set({ payment: option }),

  setSelectedKeys: (keys) => set({ selectedKeys: keys }),

  setCart: (cart) => set({ cart }),
  
}));
