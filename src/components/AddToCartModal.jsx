// src/components/AddToCartModal.jsx
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useState } from "react";

export default function AddToCartModal({ open, product, onClose, onAdd }) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  if (!open || !product) return null;

  const colorObj =
    product.colors?.find((c) => c.color === selectedColor) || null;
  const images = colorObj?.images?.length
    ? colorObj.images
    : product.images || [];
  const price = colorObj?.price || product.price;
  const sizes = colorObj?.sizes?.length ? colorObj.sizes : product.sizes || [];

  const canAdd = !sizes?.length || selectedSize;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white max-w-md w-full rounded shadow-lg p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
          type="button"
          aria-label="Close"
        >
          <CloseOutlinedIcon />
        </button>
        <div className="flex flex-col md:flex-row gap-4">
          <img
            src={images?.[0] || product.image}
            alt={product.name}
            className="w-32 h-32 object-cover rounded"
          />
          <div className="flex-1 flex flex-col gap-2">
            <h2 className="font-bold text-lg">{product.name}</h2>
            <div className="text-gray-700">{product.description}</div>
            <div className="font-bold text-orange-600 text-xl">${price.toLocaleString()}</div>
            {/* Color select */}
            {product.colors?.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <span className="font-medium">Color</span>
                {/* Default color button */}
                <button
                  className={`px-3 py-1 rounded border transition ${
                    selectedColor === ""
                      ? "border-[#fc00ff] bg-gradient-to-br from-[#fc00ff] to-[#00dbde] text-white"
                      : "border-gray-300 bg-white"
                  }`}
                  onClick={() => setSelectedColor("")}
                  type="button"
                >
                  Default
                </button>
                {product.colors.map((c) => (
                  <button
                    key={c.color}
                    className={`px-3 py-1 rounded border transition ${
                      selectedColor === c.color
                        ? "border-[#fc00ff] bg-gradient-to-br from-[#fc00ff] to-[#00dbde] text-white"
                        : "border-gray-300 bg-white"
                    }`}
                    onClick={() => setSelectedColor(c.color)}
                    type="button"
                  >
                    {c.color}
                  </button>
                ))}
              </div>
            )}
            {/* Size select */}
            {sizes?.length > 0 && (
              <div className="mt-2">
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="border rounded px-3 py-2 w-full text-center"
                >
                  <option value="" disabled>
                    Select size
                  </option>
                  {sizes.map((size) => (
                    <option key={size.size_number} value={size.size_number}>
                      {size.size_number}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              className={`mt-4 w-full py-2 rounded font-bold text-white transition ${
                canAdd
                  ? "bg-gradient-to-br from-[#fc00ff] to-[#00dbde] hover:opacity-90"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!canAdd}
              onClick={() => {
                onAdd({
                  ...product,
                  selectedColor,
                  selectedSize,
                });
                onClose();
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}