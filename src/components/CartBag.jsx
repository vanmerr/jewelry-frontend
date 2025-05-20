import { useCart } from "../contexts/CartContext";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function CartBag({ open, onClose, onViewBag }) {
  const { cart, removeFromCart } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  // Prevent background scroll when cart is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`fixed top-0 right-0 z-[99999] flex justify-end rounded-bl-3xl rounded-tl-3xl transition-all duration-300 ${open ? "visible bg-black/30" : "invisible bg-transparent"}`}
      style={{ pointerEvents: open ? "auto" : "none" }}
    >
      {/* Slide-in panel luxury */}
      <div
        className={`backdrop-blur-xl bg-white border-l-4 border-gradient-to-t from-[#fc00ff]/40 to-[#00dbde]/40 w-full max-w-md h-screen max-h-screen shadow-2xl p-0 relative flex flex-col transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"} rounded-bl-3xl rounded-tl-3xl`}
        style={{ pointerEvents: "auto" }}
      >
        {/* Header luxury */}
        <div className="relative flex flex-col items-center justify-center pt-10 pb-4 mb-2 px-8">
          <h2 className="text-3xl font-serif font-bold tracking-wide text-center bg-gradient-to-br from-[#fc00ff] to-[#00dbde] bg-clip-text text-transparent drop-shadow-lg select-none">
            SHOPPING BAG ({cart.length})
          </h2>
          <button
            className="absolute right-6 top-6 text-2xl text-gray-400 hover:text-[#fc00ff] bg-white/70 rounded-full p-2 shadow transition-all duration-200"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseOutlinedIcon fontSize="inherit" />
          </button>
        </div>
        {/* Border gradient top */}
        <div className="h-1 w-full bg-gradient-to-r from-[#fc00ff]/60 via-white/0 to-[#00dbde]/60 mb-2" />
        {/* Items luxury */}
        <div className="flex-1 overflow-y-auto pr-2 px-6 pb-2 scrollbar-hide" style={{scrollbarWidth:'none'}}>
          {cart.length === 0 ? (
            <div className="text-center text-gray-400 py-16 text-lg font-light">Your bag is empty.</div>
          ) : (
            cart.map((item) => (
              <div key={item.id + (item.selectedColor || "") + (item.selectedSize || "")}
                className="flex items-center gap-4 mb-8 bg-white/80 rounded-2xl shadow-md p-3 hover:shadow-xl transition-all duration-300 group">
                <img
                  src={item.images?.[0] || item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-2xl shadow group-hover:scale-105 transition-transform duration-300"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-serif font-extralight text-lg bg-gradient-to-br from-[#fc00ff] to-[#00dbde] bg-clip-text text-transparent">
                        {item.name}
                      </div>
                      <div className="font-bold mt-2 text-xl text-orange-400">
                        ${item.price.toLocaleString()}
                      </div>
                      <div className="flex items-center justify-between">
                          {item.selectedColor && <div className="text-gray-500 text-sm">{item.selectedColor}</div>}
                          {item.selectedSize && <div className="text-gray-500 text-sm">Size: {item.selectedSize}</div>}
                          <div className="text-sm text-gray-600 mt-1">Quantity: <span className="font-semibold">{item.quantity}</span></div>
                      </div>
                    </div>
                    <button
                      className="text-gray-300 hover:text-[#fc00ff] bg-white/70 rounded-full p-1 shadow transition-all duration-200"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove"
                    >
                      <CloseOutlinedIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Border gradient bottom */}
        <div className="h-1 w-full bg-gradient-to-r from-[#fc00ff]/60 via-white/0 to-[#00dbde]/60 mt-2" />
        {/* Subtotal luxury */}
        <div className="px-8 pt-6 pb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-lg font-serif">SUBTOTAL</span>
            <span className="font-bold text-xl bg-gradient-to-br from-[#fc00ff] to-[#00dbde] bg-clip-text text-transparent">${subtotal.toLocaleString()}</span>
          </div>
          <div className="text-gray-500 mb-4 text-sm">
            Shipping and taxes calculated at checkout.
          </div>
          <Link
            to="/shipping-bag"
            className="w-full flex justify-center items-center bg-gradient-to-br from-[#fc00ff] to-[#00dbde] text-white py-3 font-bold font-serif rounded-2xl shadow-xl hover:brightness-110 hover:scale-105 transition-all duration-200 text-lg tracking-wide mt-2"
            onClick={onViewBag}
          >
            VIEW MY SHOPPING BAG
          </Link>
        </div>
      </div>
    </div>
  );
} 