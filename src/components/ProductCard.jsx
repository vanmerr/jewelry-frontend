import { useState, useEffect } from "react";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAddToCart }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [slideDir, setSlideDir] = useState("right");
  const [liked, setLiked] = useState(false);

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  // Auto next slider
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setTimeout(() => {
      setSlideDir("right");
      setImgIdx((idx) => (idx === images.length - 1 ? 0 : idx + 1));
    }, 3000);
    return () => clearTimeout(timer);
  }, [imgIdx, images.length]);

  const prevImg = (e) => {
    e.stopPropagation();
    setSlideDir("left");
    setImgIdx((idx) => (idx === 0 ? images.length - 1 : idx - 1));
  };
  const nextImg = (e) => {
    e.stopPropagation();
    setSlideDir("right");
    setImgIdx((idx) => (idx === images.length - 1 ? 0 : idx + 1));
  };

  return (
    <div
      className="
      relative 
      w-full max-w-[250px] h-[370px]
      bg-black flex flex-col
      rounded-2xl cursor-pointer group
      transition-shadow shadow-lg hover:shadow-2xl
      mx-auto
      sm:max-w-[220px] sm:h-[320px]
      md:max-w-[240px] md:h-[340px]
      lg:max-w-[250px] lg:h-[350px]
    "
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 w-full h-full rounded-2xl z-0 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] bg-gradient-to-br from-[#e81cff] to-[#40c9ff] group-hover:rotate-[-180deg]" />
      {/* Blur effect */}
      <div className="absolute inset-0 z-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#fc00ff] to-[#00dbde] scale-95 blur-[20px] group-hover:blur-[30px] transition-all duration-500" />

      {/* Link to product details */}
      <Link
        className="relative z-10 group flex flex-col h-full"
        to={`/product/${product.id}`}
      >
        {/* Image slider */}
        <div
          className="relative w-full flex-1 flex items-start justify-center rounded-t-2xl"
          style={{ minHeight: "60%" }}
        >
          <img
            src={images[imgIdx]}
            alt={product.name}
            className="w-full h-full object-cover rounded-t-2xl"
            style={{ aspectRatio: "1/1", maxHeight: "220px" }}
          />
          {/* Nút yêu thích */}
          <button
            type="button"
            className="absolute left-3 top-3 z-40 p-1 rounded-full bg-white/80 hover:bg-pink-100 transition border border-pink-200 shadow-md"
            onClick={(e) => {
              e.preventDefault();
              setLiked((l) => !l);
            }}
            aria-label={liked ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
          >
            {liked ? (
              <FavoriteIcon className="text-pink-500" fontSize="small" />
            ) : (
              <FavoriteBorderIcon className="text-pink-500" fontSize="small" />
            )}
          </button>
          {images.length > 1 && (
            <>
              {imgIdx >= 1 && (
                <button
                  className="hidden group-hover:block absolute left-1 bottom-3 bg-black/40 text-white rounded-full p-1 hover:bg-black/70 transition"
                  onClick={prevImg}
                  tabIndex={-1}
                  aria-label="Previous image"
                  type="button"
                >
                  <ChevronLeftIcon fontSize="small" />
                </button>
              )}
              <button
                className="hidden group-hover:block absolute right-1 bottom-3 bg-black/40 text-white rounded-full p-1 hover:bg-black/70 transition"
                onClick={nextImg}
                tabIndex={-1}
                aria-label="Next image"
                type="button"
              >
                <ChevronRightIcon fontSize="small" />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1 rounded-full from-[#00dbde]/80 to-[#fc00ff]/80 transition-all duration-300
                      ${
                        i === imgIdx
                          ? `bg-gradient-to-l w-4 ${
                              slideDir === "right"
                                ? "animate-slide-right"
                                : "animate-slide-left"
                            }`
                          : "bg-gray-600/90 w-2"
                      }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Product info */}
        <div
          className="relative flex flex-col gap-2 px-3 py-2 bg-black/70 rounded-b-2xl"
          style={{ minHeight: "40%" }}
        >
          <div className="flex justify-between items-center">
            <span className="font-bold text-[16px] text-white truncate">
              {product.name}
            </span>
            {product.discount > 0 && (
              <span className="ml-2 text-xs bg-pink-500 text-white px-2 py-0.5 rounded">
                -{product.discount}%
              </span>
            )}
          </div>
          <span className="text-[15px] text-gray-200 line-clamp-2">
            {product.description}
          </span>
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-lg text-orange-500">
              ${product.price.toLocaleString()}
            </span>
            <button
              className="hidden group-hover:flex items-center gap-1 bg-gradient-to-br cursor-pointer from-[#fc00ff] to-[#00dbde] text-white px-3 py-1 rounded hover:scale-105 transition"
              onClick={(e) => {
                e.preventDefault();
                onAddToCart(product);
              }}
              title="Add to cart"
              type="button"
            >
              <ShoppingCartOutlinedIcon fontSize="small" />
              <span className="text-xs">Add</span>
            </button>
          </div>
        </div>
        {/* Quick view button */}
        <div className="absolute right-3 top-3 font-light z-40 cursor-pointer text-gray-100 bg-black/35 px-3 py-2 rounded text-[13px] sm:text-[12px] md:text-[14px] flex items-center transition group overflow-hidden">
          <span
            className="absolute inset-0 w-full h-full bg-gradient-to-l from-[#00dbde]/80 to-[#fc00ff]/80 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out z-[-1] translate-x-full group-hover:translate-x-0"
            style={{
              transitionProperty: "opacity, transform",
              willChange: "opacity, transform",
            }}
          ></span>
          <ArrowForwardOutlinedIcon fontSize="small" className="mr-1 z-10" />
          <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 whitespace-nowrap">
            View Detail
          </span>
        </div>
      </Link>
    </div>
  );
}

