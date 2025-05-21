import { useLocation } from "react-router-dom";
import collections from "../services/collections";
import products from "../services/products";
import CollectionList from "../components/CollectionList";
import ProductList from "../components/ProductList";
import { useState, useEffect, useMemo } from "react";
import ProductFilterSort from "../components/ProductFilterSort";
import { useIntersectionObserver } from "@uidotdev/usehooks";

export default function Explore() {
  // 'all', 'collections', 'products'
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";
  const viewParam = params.get("view");
  const [bannerRef, bannerEntry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });


  const [heroRef, heroEntry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  const [view, setView] = useState(
    viewParam === "collections" || viewParam === "products" ? viewParam : "all"
  );

  // Sync view with query param if it changes
  useEffect(() => {
    if (viewParam === "collections" || viewParam === "products") {
      setView(viewParam);
    } else {
      setView("all");
    }
  }, [viewParam]);

  // Filter states
  const [sort, setSort] = useState("");
  const [status, setStatus] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Get all unique categories from products
  const allCategories = [...new Set(products.map((p) => p.category))];

  // Simple search logic
  const filteredCollections = useMemo(() => {
    return collections.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.description?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search filter
        const matchesSearch =
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description?.toLowerCase().includes(search.toLowerCase());

        // Status filter
        const matchesStatus = !status || p.status === status;

        // Category filter
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(p.category);

        return matchesSearch && matchesStatus && matchesCategory;
      })
      .sort((a, b) => {
        // Sort by price
        if (sort === "asc") return a.price - b.price;
        if (sort === "desc") return b.price - a.price;
        return 0;
      });
  }, [search, sort, status, selectedCategories]);

  // If searching, always show both
  const isSearching = search.trim().length > 0;
  const effectiveView = isSearching ? "all" : view;

  // --- Collection Banner Slider ---
  function CollectionBannerSlider({ collections }) {
    const [idx, setIdx] = useState(0);
    useEffect(() => {
      if (!collections.length) return;
      setIdx(0);
    }, [collections]);
    useEffect(() => {
      if (!collections.length) return;
      const timer = setInterval(() => {
        setIdx((i) => (i + 1) % collections.length);
      }, 3000);
      return () => clearInterval(timer);
    }, [collections]);
    if (!collections.length) return null;
    const col = collections[idx];
    return (
      <div
        ref={bannerRef}
        className={`relative w-full h-[220px] md:h-[300px] rounded-2xl overflow-hidden mb-8 shadow-xl transition-all duration-2000
          ${
            bannerEntry?.isIntersecting
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }
        `}
      >
        <img
          src={col.image}
          alt={col.name}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-[#fc00ff]/30" />
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          <h2 className="font-serif line-clamp-1 text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
            {col.name}
          </h2>
          <p className="text-lg md:text-xl line-clamp-2 text-white/90 font-light drop-shadow-md max-w-2xl">
            {col.description}
          </p>
        </div>
      </div>
    );
  }

  // --- Product Banner (static) ---
  const PRODUCT_BANNER = {
    image:
      "https://media.istockphoto.com/id/1394289138/vi/anh/n%C6%A1i-l%C3%A0m-vi%E1%BB%87c-c%E1%BB%A7a-m%E1%BB%99t-th%E1%BB%A3-kim-ho%C3%A0n-c%C3%A1c-c%C3%B4ng-c%E1%BB%A5-v%C3%A0-thi%E1%BA%BFt-b%E1%BB%8B-cho-%C4%91%E1%BB%93-trang-s%E1%BB%A9c-ho%E1%BA%A1t-%C4%91%E1%BB%99ng-tr%C3%AAn-m%C3%A1y.jpg?s=612x612&w=0&k=20&c=SyXzwAVyixokIIxdivp1Eu6AvpJ4P2pRHF_vBMgGrPo=", // Replace with your actual image path
    title: "Explore Our Iconic Creations",
    subtitle:
      "From classic to contemporary, find the perfect piece for every desire.",
  };
  function HeroBanner({ image, title, subtitle }) {
    return (
      <div
        ref={heroRef}
        className={`relative w-full h-[220px] md:h-[300px] rounded-2xl overflow-hidden mb-8 shadow-xl transition-all duration-2000
          ${
            heroEntry?.isIntersecting
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }
        `}
      >
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-[#fc00ff]/30" />
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-white/90 font-light drop-shadow-md max-w-2xl">
            {subtitle}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-[56px]">
      <h1 className="font-serif text-3xl font-bold text-center mb-8">
        Explore
      </h1>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <div className="flex gap-2 bg-white rounded-full shadow-lg p-1">
          {[
            { label: "All", value: "all" },
            { label: "Collections", value: "collections" },
            { label: "Products", value: "products" },
          ].map((btn) => (
            <button
              key={btn.value}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 text-base
                ${
                  effectiveView === btn.value
                    ? "bg-gradient-to-br from-[#fc00ff] to-[#00dbde] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gradient-to-br hover:from-[#fc00ff]/10 hover:to-[#00dbde]/10"
                }
                ${
                  isSearching
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer"
                }
              `}
              onClick={() => setView(btn.value)}
              disabled={isSearching}
              type="button"
            >
              {btn.label}
            </button>
          ))}
        </div>
        <ProductFilterSort
          categories={allCategories}
          selectedSort={sort}
          selectedStatus={status}
          selectedCategories={selectedCategories}
          onSortChange={setSort}
          onStatusChange={setStatus}
          onCategoriesChange={setSelectedCategories}
        />
      </div>
      {/* Render logic */}
      {effectiveView === "collections" && (
        <>
          <CollectionBannerSlider collections={filteredCollections} />
          <div className="transition-all duration-1000">
            <CollectionList collections={filteredCollections} />
          </div>
        </>
      )}
      {effectiveView === "products" && (
        <>
          <HeroBanner {...PRODUCT_BANNER} />
          <div className="transition-all duration-1000">
            <ProductList products={filteredProducts} />
          </div>
        </>
      )}
      {effectiveView === "all" && (
        <>
          <CollectionBannerSlider collections={filteredCollections} />
          <h2 className="font-serif text-2xl text-center font-bold mt-8 mb-6">
            Collections
          </h2>

          <CollectionList collections={filteredCollections} />

          <HeroBanner {...PRODUCT_BANNER} />
          <h2 className="font-serif text-2xl text-center font-bold mt-8 mb-6">
            Products
          </h2>
          <ProductList products={filteredProducts} />
        </>
      )}
    </div>
  );
}
