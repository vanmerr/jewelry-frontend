import { useState } from "react";
import { CartContext } from "./CartContextContext";
import { getStoredValue, normalizeColor } from "./cartHelpers";

export function CartProvider({ children }) {
  const [cart, setCart] = useState(getStoredValue);

  const updateCart = (newCart) => {
    setCart(newCart);
    sessionStorage.setItem("carts", JSON.stringify(newCart));
  };

  const addToCart = (item) => {
    const normalizedColor = normalizeColor(item.selectedColor);
    const exists = cart.find(
      (p) =>
        p.id === item.id &&
        normalizeColor(p.selectedColor) === normalizedColor &&
        (p.selectedSize || "") === (item.selectedSize || "")
    );
    let updatedCart;
    if (exists) {
      updatedCart = cart.map((p) =>
        p.id === item.id &&
        normalizeColor(p.selectedColor) === normalizedColor &&
        (p.selectedSize || "") === (item.selectedSize || "")
          ? { ...p, quantity: (p.quantity || 1) + 1 }
          : p
      );
    } else {
      updatedCart = [...cart, { ...item, selectedColor: normalizedColor, quantity: 1 }];
    }
    updateCart(updatedCart);
  };

  const removeFromCart = (id, selectedColor, selectedSize) => {
    const normalizedColor = normalizeColor(selectedColor);
    const updatedCart = cart.filter(
      (p) =>
        !(
          p.id === id &&
          normalizeColor(p.selectedColor) === normalizedColor &&
          (p.selectedSize || "") === (selectedSize || "")
        )
    );
    updateCart(updatedCart);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const updateQuantity = (id, selectedColor, selectedSize, change) => {
    const normalizedColor = normalizeColor(selectedColor);
    const updatedCart = cart.map((item) => {
      if (
        item.id === id &&
        normalizeColor(item.selectedColor) === normalizedColor &&
        (item.selectedSize || "") === (selectedSize || "")
      ) {
        return { ...item, quantity: Math.max(1, (item.quantity || 1) + change) };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, setCart: updateCart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}