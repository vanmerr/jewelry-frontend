import { useParams } from "react-router-dom";
import products from "../services/products";
import ProductGallery from "../components/ProductGallery";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../contexts/CartContext";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();

  // Xử lý màu sắc
  const [selectedColor, setSelectedColor] = useState(""); // Không chọn màu mặc định
  const colorObj =
    product?.colors?.find((c) => c.color === selectedColor) || null;

  // Lấy images, price, sizes theo màu nếu có, nếu không lấy mặc định
  const images = colorObj?.images?.length
    ? colorObj.images
    : product?.images || [];
  const price = colorObj?.price || product?.price;
  const sizes = colorObj?.sizes?.length ? colorObj.sizes : product?.sizes || [];

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(images?.[0] || "");
  const [thumbStart, setThumbStart] = useState(0);
  const maxThumbs = 4;

  // State cho modal mô tả
  const [showDescModal, setShowDescModal] = useState(false);
  const [isDescClamped, setIsDescClamped] = useState(false);
  const descRef = useRef(null);

  // Xử lý thumbnail hiển thị
  const canPrev = thumbStart > 0;
  const canNext = thumbStart + maxThumbs < images.length;
  const visibleThumbs = images.slice(thumbStart, thumbStart + maxThumbs);

  // Auto chuyển ảnh gallery
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setSelectedImage((prev) => {
        const currentIdx = images.indexOf(prev);
        const nextIdx = (currentIdx + 1) % images.length;
        if (nextIdx < thumbStart || nextIdx >= thumbStart + maxThumbs) {
          setThumbStart(
            Math.max(0, Math.min(nextIdx, images.length - maxThumbs))
          );
        }
        return images[nextIdx];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [images, thumbStart, maxThumbs]);

  // Khi đổi màu thì reset ảnh và size
  useEffect(() => {
    setSelectedImage(images?.[0] || "");
    setSelectedSize("");
    setThumbStart(0);
  }, [selectedColor]);

  useEffect(() => {
    // Kiểm tra xem mô tả có bị cắt dòng không
    if (descRef.current) {
      setIsDescClamped(
        descRef.current.scrollHeight > descRef.current.clientHeight
      );
    }
  }, [product.description]);

  if (!product)
    return <div className="p-8 text-center">Product not found.</div>;

  return (
    <>
      <div className="max-w-5xl mx-auto mt-[56px] py-12 px-4 flex flex-col md:flex-row gap-12">
        {/* Gallery */}
        <div className="flex-1 flex flex-col gap-4 relative">
          <ProductGallery image={selectedImage} />
          {images.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-2 relative">
              {/* Prev button */}
              {canPrev && (
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gradient-to-br hover:from-[#fc00ff] hover:to-[#00dbde] hover:text-white border border-gray-300 text-gray-700 transition absolute left-12 top-1/2 -translate-y-1/2 z-10"
                  onClick={() => setThumbStart((s) => Math.max(0, s - 1))}
                  aria-label="Previous thumbnails"
                  type="button"
                >
                  &lt;
                </button>
              )}
              {/* Thumbnails */}
              <div className="flex gap-2 mx-10">
                {visibleThumbs.map((img, idx) => (
                  <div
                    key={thumbStart + idx}
                    className={`p-[2px] rounded bg-gradient-to-br from-[#fc00ff] to-[#00dbde] ${
                      selectedImage === img ? "" : "bg-none"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`thumb-${thumbStart + idx}`}
                      className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
                        selectedImage === img
                          ? "border-transparent"
                          : "border-gray-200"
                      } bg-white`}
                      onClick={() => setSelectedImage(img)}
                    />
                  </div>
                ))}
              </div>
              {/* Next button */}
              {canNext && (
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gradient-to-br  hover:text-white hover:from-[#fc00ff] hover:to-[#00dbde] border border-gray-300 text-gray-700 transition absolute right-12 top-1/2 -translate-y-1/2 z-10"
                  onClick={() =>
                    setThumbStart((s) =>
                      Math.min(images.length - maxThumbs, s + 1)
                    )
                  }
                  aria-label="Next thumbnails"
                  type="button"
                >
                  &gt;
                </button>
              )}
            </div>
          )}
        </div>
        {/* Info */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="font-serif text-3xl font-bold text-black">
            {product.name}
          </h1>
          {/* Mô tả sản phẩm (giới hạn 4 dòng) */}
          <div className="relative">
            <div
              ref={descRef}
              className="text-lg text-gray-700 bg-white rounded line-clamp-4 shadow p-6"
              style={{
                WebkitBoxOrient: "vertical",
                display: "-webkit-box",
                WebkitLineClamp: 4,
                overflow: "hidden",
              }}
            >
              {product.description}
            </div>
            {isDescClamped && (
              <button
                className="absolute bottom-2 right-4 text-sm text-[#fc00ff] font-semibold bg-white bg-opacity-80 px-2 py-1 rounded hover:underline"
                onClick={() => setShowDescModal(true)}
                type="button"
              >
                Read more
              </button>
            )}
          </div>
          {/* Modal hiển thị đầy đủ mô tả */}
          {showDescModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white max-w-lg w-full rounded shadow-lg p-6 relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                  onClick={() => setShowDescModal(false)}
                  type="button"
                  aria-label="Close"
                >
                  <CloseOutlinedIcon />
                </button>
                <div className="text-lg text-gray-700 whitespace-pre-line">
                  {product.description}
                </div>
              </div>
            </div>
          )}
          <span className="text-2xl font-bold text-orange-600">
            ${price.toLocaleString()}
          </span>
          {/* Color select */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="font-medium">Color</span>
              {/* Nút chọn lại (reset) màu */}
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
          {sizes && sizes.length > 0 && (
            <div>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(Number(e.target.value))}
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
          <div className="flex gap-4 mt-4">
            <button
              className="bg-black flex-1 text-white hover:bg-gradient-to-br from-[#fc00ff] to-[#00dbde] px-6 py-3 rounded font-semibold transition hover:bg-pink-600"
              onClick={() =>
                addToCart({
                  ...product,
                  selectedSize,
                  selectedColor,
                })
              }
            >
              Add to Cart
            </button>
            <button
              className="flex items-center gap-2 border border-gray-300 rounded px-6 py-3 font-semibold text-gray-700 hover:bg-gradient-to-br hover:from-[#fc00ff] hover:to-[#00dbde] hover:text-white transition"
              type="button"
              // onClick={handleFavorite} // Thêm hàm xử lý nếu cần
            >
              <FavoriteSharpIcon className="text-[#fc00ff]" />
              Yêu thích
            </button>
          </div>
        </div>
      </div>

      {product.related && product.related.length > 0 && (
        <div className="max-w-5xl mx-auto mt-16 px-4 mb-8">
          <h2 className="font-serif text-2xl text-center font-bold mb-6 text-black">
            Related Creations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {product.related
              .map((relId) => products.find((p) => p.id === relId))
              .filter(Boolean)
              .map((relProduct) => (
                <div key={relProduct.id}>
                  <ProductCard product={relProduct} onAddToCart={addToCart} />
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Service Info Section */}
      <div className="max-w-5xl mx-auto mt-16 px-4 mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gift Wrapping */}
        <div className="flex bg-[#fafafa] rounded shadow overflow-hidden">
          <img
            src="https://www.cartier.com/on/demandware.static/-/Library-Sites-CartierSharedLibrary-BGTJ/default/dw1af055b2/w750.jpeg" // Thay bằng đường dẫn ảnh thực tế của bạn
            alt="Gift Wrapping"
            className="w-1/3 object-cover"
          />
          <div className="p-8 flex-1 flex flex-col justify-center">
            <h3 className="font-bold text-xl mb-2 tracking-wide">GIFT WRAPPING</h3>
            <p className="mb-4 text-gray-700">
              Send your presents in our signature packaging with a personalised greetings card included.
            </p>
            <a href="#" className="underline underline-offset-4 text-black font-medium hover:text-[#fc00ff] w-fit">
              Read More
            </a>
          </div>
        </div>
        {/* Shipping / Return */}
        <div className="flex flex-col justify-center bg-[#fafafa] rounded shadow p-8">
          <h3 className="font-bold text-xl mb-2 tracking-wide">SHIPPING / RETURN</h3>
          <p className="mb-4 text-gray-700">
            We offer different delivery options. Choose the one you prefer at the checkout. You may return or exchange your creation within 30 days.
          </p>
          <div className="flex gap-8">
            <a href="#" className="underline underline-offset-4 text-black font-medium hover:text-[#fc00ff] w-fit">
              View Shipping
            </a>
            <a href="#" className="underline underline-offset-4 text-black font-medium hover:text-[#fc00ff] w-fit">
              View Return
            </a>
          </div>
        </div>
      </div>

      {/* You may also like section */}
      <div className="max-w-5xl mx-auto mt-16 px-4 mb-8">
        <h2 className="font-serif text-2xl text-center font-bold mb-6 text-black">
          You may also like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products
            .filter((p) => p.category === product.category && p.id !== product.id)
            .slice(0, 3)
            .map((suggestedProduct) => (
              <div key={suggestedProduct.id}>
                <ProductCard product={suggestedProduct} onAddToCart={addToCart} />
              </div>
            ))}
        </div>
      </div>

      {/* Service Highlights Section */}
      <div className="w-full bg-[#fafafa] py-12 mt-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-center gap-12">
          {/* Complimentary Delivery */}
          <div className="flex flex-col items-center">
            {/* Icon */}
            <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" className="mb-4" viewBox="0 0 48 48">
              <rect x="8" y="12" width="32" height="24" rx="2" stroke="currentColor" />
              <circle cx="24" cy="32" r="1.5" fill="currentColor" />
            </svg>
            <span className="text-lg font-medium tracking-wide text-center">COMPLIMENTARY DELIVERY</span>
          </div>
          {/* Easy Return or Exchange */}
          <div className="flex flex-col items-center">
            {/* Icon */}
            <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" className="mb-4" viewBox="0 0 48 48">
              <rect x="8" y="12" width="32" height="24" rx="2" stroke="currentColor" />
              <path d="M24 28l-4-4 4-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 24h8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-lg font-medium tracking-wide text-center">EASY RETURN OR EXCHANGE</span>
          </div>
          {/* Free Gift Wrapping */}
          <div className="flex flex-col items-center">
            {/* Icon */}
            <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" className="mb-4" viewBox="0 0 48 48">
              <rect x="10" y="14" width="28" height="20" rx="2" stroke="currentColor" />
              <path d="M10 14l14 12 14-12" stroke="currentColor" />
              <circle cx="24" cy="26" r="1.5" fill="currentColor" />
            </svg>
            <span className="text-lg font-medium tracking-wide text-center">FREE GIFT WRAPPING</span>
          </div>
        </div>
      </div>
    </>
  );
}
