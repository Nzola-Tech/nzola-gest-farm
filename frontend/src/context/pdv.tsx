import { CartItem, paymentOptions } from "@/types/pdv";
import React, { createContext, useState } from "react"
import { Selection } from "@heroui/table";

export type PdvContextProps = {
  cart: CartItem[];
  payment: string;
  selectedKeys: Selection;
  addToCart: (product: CartItem) => void
  changePayment: (option: string) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  setSelectedKeys: React.Dispatch<React.SetStateAction<Selection>>

}

export const PdvContext = createContext({} as PdvContextProps)

export const PdvProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [payment, setPayment] = useState(paymentOptions[0].value);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))

  const addToCart = (product: CartItem) => setCart(prev => {
    const exists = prev.find(item => item.id === product.id);
    if (exists) {
      return prev.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    return [...prev, { ...product, quantity: 1 }];
  });

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
    setSelectedKeys(prev => {
      const newKeys = new Set(prev);
      newKeys.delete(String(id));
      return newKeys;
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const changePayment = (option: string) => setPayment(option)

  return (
    <>
      <PdvContext.Provider value={{ cart, payment, selectedKeys, changePayment, addToCart, removeFromCart, updateQuantity, setSelectedKeys}}>
        {children}
      </PdvContext.Provider>
    </>
  )
}