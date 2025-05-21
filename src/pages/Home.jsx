import { Link } from "react-router-dom";
import collections from "../services/collections";
import CollectionList from "../components/CollectionList";
import banner from "../assets/banner.jpg";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { useIntersectionObserver } from "@uidotdev/usehooks";

export default function Home() {
  const featuredCollection = collections.filter((p) => p.status === "featured");

  const [herorRef, heroEntry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  const [servicesRef, servicesEntry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  const [featuredRef, featuredEntry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  return (
    <div>
      {/* Hero Banner Luxury */}
      <section
        ref={herorRef}
        className={`
          relative h-[60vh] mt-[56px] flex items-center justify-center bg-cover bg-center
          transition-all duration-1000
          ${heroEntry?.isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-[#fc00ff]/40 to-[#00dbde]/40" />
        <div className="relative z-10 text-center flex flex-col items-center justify-center w-full px-4">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg animate-gradient-x bg-gradient-to-br from-[#fc00ff] via-white to-[#00dbde] bg-clip-text text-transparent">
            Handcrafted Luxury, Timeless Desire
          </h1>
          <p className="mb-8 text-lg md:text-2xl font-light text-white/90 max-w-2xl mx-auto">
            Discover the elegance of artisan jewelry
          </p>
          <Link
            to="/explore"
            className="bg-gradient-to-br from-[#fc00ff] to-[#00dbde] text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:brightness-110 hover:scale-105 transition-all duration-200 tracking-wide"
          >
            Explore Collection
          </Link>
        </div>
      </section>
      {/* Luxury Services Section */}
      <section
        ref={servicesRef}
        className={`
          py-12 px-4 max-w-5xl mx-auto
          transition-all duration-1000
          ${servicesEntry?.isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-6 bg-white/80 rounded-2xl shadow-lg border border-[#fc00ff]/20 hover:shadow-2xl transition-all duration-300">
            <DiamondOutlinedIcon className="text-4xl text-[#fc00ff] mb-2" />
            <span className="font-semibold text-lg mb-1">
              Exquisite Craftsmanship
            </span>
            <span className="text-gray-600 text-center">
              Every detail is meticulously perfected by master artisans.
            </span>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/80 rounded-2xl shadow-lg border border-[#fc00ff]/20 hover:shadow-2xl transition-all duration-300">
            <LocalOfferOutlinedIcon className="text-4xl text-[#fc00ff] mb-2" />
            <span className="font-semibold text-lg mb-1">Ethical Sourcing</span>
            <span className="text-gray-600 text-center">
              Responsibly sourced gems and materials, always.
            </span>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/80 rounded-2xl shadow-lg border border-[#fc00ff]/20 hover:shadow-2xl transition-all duration-300">
            <EmojiEventsOutlinedIcon className="text-4xl text-[#fc00ff] mb-2" />
            <span className="font-semibold text-lg mb-1">Premium Service</span>
            <span className="text-gray-600 text-center">
              Complimentary delivery, gift wrapping, and easy returns.
            </span>
          </div>
        </div>
      </section>
      {/* Featured Collections Luxury */}
      <section
        ref={featuredRef}
        className={`
          py-16 px-4 max-w-6xl mx-auto
          transition-all duration-1000
          ${featuredEntry?.isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        <h2 className="font-serif text-3xl md:text-4xl text-center mb-10 font-bold animate-gradient-x bg-gradient-to-br from-[#fc00ff] to-[#00dbde] bg-clip-text text-transparent">
          Featured Collection
        </h2>
        <CollectionList collections={featuredCollection.slice(0, 4)} />
        <div className="text-center mt-16">
          <Link
            to="/explore"
            className="bg-gradient-to-br from-[#fc00ff] to-[#00dbde] text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:brightness-110 hover:scale-105 transition-all duration-200 tracking-wide"
          >
            Explore Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
