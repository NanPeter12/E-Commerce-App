"use client";
import React, { createContext, useState, ReactNode } from "react";

export const CartContext = createContext({ cartCount: 0, updateCartCount: (x: number) => { } }); // lazem ya5od el object bta3 el data elli htob2a shared bay5od el initial values

export function CartProvider({ children }: { children: ReactNode }) { 

  const [cartCount, setCartCount] = useState(0);


  function updateCartCount(newCount: number) {
    setCartCount(newCount);
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
}
