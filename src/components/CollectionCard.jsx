import { Link } from "react-router-dom";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { useIntersectionObserver } from "@uidotdev/usehooks";

export default function ConllectionCard({ collection }) {
  const [cardRef, cardEntry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });
  return (
    <div
      ref={cardRef}
      className={`relative 
      w-full max-w-[250px] h-[320px] 
      bg-black flex flex-col justify-end gap-3 
      rounded-lg cursor-pointer group 
      shadow-lg hover:shadow-2xl
      mx-auto
      sm:max-w-[220px] sm:h-[280px]
      md:max-w-[240px] md:h-[300px]
      lg:max-w-[250px] lg:h-[300px]
      transition-all duration-1000 ${
        cardEntry?.isIntersecting
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 w-full h-full rounded-xl z-0 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] bg-gradient-to-br from-[#e81cff] to-[#40c9ff] group-hover:rotate-[-180deg]" />
      {/* Blur effect */}
      <div className="absolute inset-0 z-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#fc00ff] to-[#00dbde] scale-95 blur-[20px] group-hover:blur-[30px] transition-all duration-500" />

      <Link
        to={`/collection/${collection.id}`}
        className="relative z-10 w-full h-full flex flex-col justify-end"
        tabIndex={-1}
      >
        <img
          src={collection.image}
          alt={collection.name}
          className="absolute inset-0 w-full h-full object-cover rounded-lg mix-blend-darken"
        />
        {/* Hiển thị tên sản phẩm */}
        <span className="absolute left-1 w-[150px] text-center line-clamp-1 bottom-3 max-md:opacity-100  font-bold-[600] text-[15px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-gray-100 bg-black/50 px-2 py-1 rounded whitespace-nowrap opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 z-30">
          {collection.name}
        </span>
        <span className="absolute -left-2 top-2 bg-gradient-to-br from-[#fc00ff]/70 to-[#00dbde]/70 text-xs font-bold px-2 py-1 rounded shadow-lg z-20 animate-bounce">
          {collection.status === "featured" && (
            <EmojiEventsOutlinedIcon
              fontSize="small"
              className="text-orange-500"
            />
          )}
          {collection.status === "luxury" && (
            <DiamondOutlinedIcon fontSize="small" className="text-blue-700" />
          )}
          {collection.status === "limited-edition" && (
            <LocalOfferOutlinedIcon fontSize="small" className="text-red-500" />
          )}
        </span>
      </Link>
      <div className="absolute right-3 top-3 font-light z-40 cursor-pointer text-gray-100 bg-black/35 px-3 py-2 rounded text-[13px] sm:text-[12px] md:text-[14px] flex items-center transition group overflow-hidden">
        <span
          className="absolute inset-0 w-full h-full bg-gradient-to-l from-[#00dbde]/80 to-[#fc00ff]/80 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out z-[-1] translate-x-full group-hover:translate-x-0"
          style={{
            transitionProperty: "opacity, transform",
            willChange: "opacity, transform",
          }}
        ></span>
        <ArrowForwardOutlinedIcon fontSize="small" className="mr-1 z-10" />
        <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 whitespace-nowrap z-10">
          Get Conllection
        </span>
      </div>
    </div>
  );
}
