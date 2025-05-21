// src/contexts/cartHelpers.js

// Lấy cart từ sessionStorage
export function getStoredValue() {
  const stored = sessionStorage.getItem("carts");
  if (stored !== null) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

// Chuẩn hóa màu
export function normalizeColor(color) {
  return color === undefined || color === "" ? "Default" : color;
}
