import { useContext } from "react";
import { CartContext } from "./CartContextContext";

export function useCart() {
  return useContext(CartContext);
} 