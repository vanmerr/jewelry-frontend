import { Link } from "react-router-dom";
import collections from "../services/collections";
import CollectionCard from "../components/CollectionCard";
import banner from "../assets/banner.jpg";

export default function Home() {
  return (
    <div>
      {/* Hero Banner */}
      <section
        className="relative h-[60vh] mt-[56px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Handcrafted Luxury, Timeless Desire
          </h1>
          <p className="mb-8 text-lg md:text-2xl font-light">
            Discover the elegance of artisan jewelry
          </p>
          <Link
            to="/collections"
            className="bg-gold text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition"
          >
            Explore Collection
          </Link>
        </div>
      </section>
      {/* Featured Collections */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl text-black text-center mb-10 font-bold">
          Featured Collection
        </h2>
        {(() => {
          const featuredConllection = collections
            .filter((p) => p.status === "featured")
            .slice(0, 6);
          return (
            <div
              className={`
                grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8
                ${featuredConllection.length < 6 ? "justify-items-center" : ""}
              `}
            >
              {featuredConllection.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </div>
          );
        })()}
        <div className="text-center mt-16">
          <Link
            to="/collections"
            className="bg-black text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition"
          >
            Explore Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
