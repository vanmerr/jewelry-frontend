import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const getStoredValue = () => {
    const stored = sessionStorage.getItem("carts");
    if (stored !== null) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  };

  const [cart, setCart] = useState(getStoredValue);

  const updateCart = (newCart) => {
    setCart(newCart);
    sessionStorage.setItem("carts", JSON.stringify(newCart));
  };

  const addToCart = (item) => {
    const exists = cart.find((p) => p.id === item.id);
    let updatedCart;
    if (exists) {
      updatedCart = cart.map((p) =>
        p.id === item.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
      );
    } else {
      updatedCart = [...cart, { ...item, quantity: 1 }];
    }
    updateCart(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((p) => p.id !== id);
    updateCart(updatedCart);
  };

  const clearCart = () => {
    updateCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, setCart: updateCart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}


export function useCart() {
  return useContext(CartContext);
}