// src/components/AddToCartModal.jsx
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";

export default function AddToCartModal({ open, product, onClose, onAdd }) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (open) {
      setSelectedColor("");
      setSelectedSize("");
      setQuantity(1);
    }
  }, [open]);

  if (!open || !product) return null;

  const colorObj = product.colors?.find((c) => c.color === selectedColor) || null;
  const image = colorObj?.images?.[0] || product.images?.[0] || product.image;
  const price = colorObj?.price || product.price;
  const sizes = colorObj?.sizes?.length ? colorObj.sizes : product.sizes || [];

  const canAdd = !sizes?.length || selectedSize;

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white max-w-md w-full rounded-2xl shadow-2xl p-6 relative mx-4"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl bg-white/80 rounded-full p-1 hover:bg-pink-100 transition z-10"
          onClick={onClose}
          type="button"
          aria-label="Close"
        >
          <CloseOutlinedIcon />
        </button>
        {/* IMAGE ONLY */}
        <div className="w-full flex justify-center mb-4">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shadow-lg bg-gray-100">
            <img
              src={image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* INFO SECTION */}
        <div className="flex flex-col gap-3">
          <h2 className="font-serif text-xs md:text-sm font-bold text-gray-900 text-center">{product.name}</h2>
          <div className="font-bold text-2xl text-orange-500 text-center">${price.toLocaleString()}</div>
          {/* Color select as select */}
          {product.colors?.length > 0 && (
            <div className="mt-2">
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:border-[#fc00ff] focus:ring-2 focus:ring-[#fc00ff]/20 outline-none transition-all duration-300 text-center"
              >
                <option value="">Default</option>
                {product.colors.map((c) => (
                  <option key={c.color} value={c.color}>
                    {c.color}
                  </option>
                ))}
              </select>
            </div>
          )}
          {/* Size select */}
          {sizes?.length > 0 && (
            <div className="mt-2">
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:border-[#fc00ff] focus:ring-2 focus:ring-[#fc00ff]/20 outline-none transition-all duration-300 text-center"
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
          {/* Quantity selector */}
          <div className="flex items-center gap-4 mt-2 justify-center">
            <span className="font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center gap-2">
              <button
                className="p-2 rounded-full border border-gray-300 hover:border-[#fc00ff] hover:bg-[#fc00ff]/10 transition-all duration-300"
                onClick={() => handleQuantityChange(-1)}
                type="button"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                className="p-2 rounded-full border border-gray-300 hover:border-[#fc00ff] hover:bg-[#fc00ff]/10 transition-all duration-300"
                onClick={() => handleQuantityChange(1)}
                type="button"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          {/* Add to cart button */}
          <button
            className={`mt-4 w-full py-3 rounded-full font-bold text-white transition-all duration-300 transform hover:scale-105 ${
              canAdd
                ? "bg-gradient-to-br from-[#fc00ff] to-[#00dbde] hover:shadow-lg hover:shadow-[#fc00ff]/20"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!canAdd}
            onClick={() => {
              onAdd({
                ...product,
                selectedColor,
                selectedSize,
                quantity,
              });
              onClose();
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}