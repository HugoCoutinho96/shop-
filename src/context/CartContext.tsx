'use client'
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  priceId: string;
  quantity: number;
  imageUrl: string;
};

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  updateProductQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  removeProduct: (itemId: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const state = localStorage.getItem("shop:cart")
    if(state){
        setCart(JSON.parse(state))
    }
  },[])

  useEffect(() => {
    localStorage.setItem("shop:cart", JSON.stringify(cart))
  },[cart])

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateProductQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, quantity } : product
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("shop:cart")
  }

  const removeProduct = (itemId: string) => {
    const products = cart.filter(item => item.id !== itemId)
    setCart(products)
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, updateProductQuantity, removeProduct}}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}