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
    // Đảm bảo selectedColor luôn là 'Default' nếu rỗng
    const normalizedColor = item.selectedColor === undefined || item.selectedColor === '' ? 'Default' : item.selectedColor;
    // Match by id, selectedColor, selectedSize
    const exists = cart.find(
      (p) =>
        p.id === item.id &&
        ((p.selectedColor === undefined || p.selectedColor === '') ? 'Default' : p.selectedColor) === normalizedColor &&
        (p.selectedSize || "") === (item.selectedSize || "")
    );
    let updatedCart;
    if (exists) {
      updatedCart = cart.map((p) =>
        p.id === item.id &&
        ((p.selectedColor === undefined || p.selectedColor === '') ? 'Default' : p.selectedColor) === normalizedColor &&
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
    const normalizedColor = selectedColor === undefined || selectedColor === '' ? 'Default' : selectedColor;
    const updatedCart = cart.filter(
      (p) =>
        !(
          p.id === id &&
          ((p.selectedColor === undefined || p.selectedColor === '') ? 'Default' : p.selectedColor) === normalizedColor &&
          (p.selectedSize || "") === (selectedSize || "")
        )
    );
    updateCart(updatedCart);
  };

  const clearCart = () => {
    updateCart([]);
  };

  // Hàm cập nhật số lượng sản phẩm theo id, color, size
  const updateQuantity = (id, selectedColor, selectedSize, change) => {
    const normalizedColor = selectedColor === undefined || selectedColor === '' ? 'Default' : selectedColor;
    const updatedCart = cart.map((item) => {
      if (
        item.id === id &&
        ((item.selectedColor === undefined || item.selectedColor === '') ? 'Default' : item.selectedColor) === normalizedColor &&
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


export function useCart() {
  return useContext(CartContext);
}