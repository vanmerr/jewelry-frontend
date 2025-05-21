import { Link, useParams } from "react-router-dom";
import collections from "../services/collections";
import products from "../services/products";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import ProductFilterSort from "../components/ProductFilterSort";
import ProductList from "../components/ProductList";
import { useState } from "react";
import { useIntersectionObserver } from "@uidotdev/usehooks";

export default function CollectionDetails() {
  const { id } = useParams();
  const collection = collections.find((c) => c.id === Number(id));

  // Filter states
  const [sort, setSort] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Get all unique categories from collection products
  const collectionProducts = products.filter(
    (p) => p.collectionId === Number(id)
  );
  const allCategories = [...new Set(collectionProducts.map((p) => p.category))];

  // Filter and sort products
  const filteredProducts = collectionProducts
    .filter((p) => {
      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(p.category);
      return matchesCategory;
    })
    .sort((a, b) => {
      // Sort by price
      if (sort === "asc") return a.price - b.price;
      if (sort === "desc") return b.price - a.price;
      return 0;
    });

  const [bannerRef, bannerEntry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  const [infoRef, infoEntry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  const [productsRef, productsEntry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });


  if (!collection) {
    return (
      <div className="flex justify-center items-center min-h-[200px] text-gray-500 text-lg">
        Collection not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-[56px]">
      {/* Collection Banner */}
      <div
        ref={bannerRef}
        className={`relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8 shadow-xl
          ${
            bannerEntry?.isIntersecting
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }
        `}
      >
        <img
          src={collection.image}
          alt={collection.name}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-[#fc00ff]/30" />
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
            {collection.name}
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light drop-shadow-md max-w-2xl">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="w-full md:w-[90%] m-auto flex h-10 items-center mt-4 md:mt-8">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to="/"
            className="relative text-gray-400 hover:text-gray-800 font-light group"
          >
            <span>Home</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-br from-[#fc00ff] to-[#00dbde] transition-all group-hover:w-full"></span>
          </Link>
          <Link
            to="/explore"
            className="relative text-gray-400 hover:text-gray-800 font-light group"
          >
            <span>All Collections</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-br from-[#fc00ff] to-[#00dbde] transition-all group-hover:w-full"></span>
          </Link>
          <span className="text-gray-800">{collection.name}</span>
        </Breadcrumbs>
      </div>

      {/* Collection Info */}
      <div
        ref={infoRef}
        className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-12
          ${
            infoEntry?.isIntersecting
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }
        `}
      >
        <div className="flex items-center gap-2 bg-gradient-to-br from-[#fc00ff]/10 to-[#00dbde]/10 p-4 rounded-xl">
          <DiamondOutlinedIcon className="text-[#fc00ff]" />
          <span className="text-sm font-medium">Luxury Quality</span>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-br from-[#fc00ff]/10 to-[#00dbde]/10 p-4 rounded-xl">
          <EmojiEventsOutlinedIcon className="text-[#fc00ff]" />
          <span className="text-sm font-medium">Premium Design</span>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-br from-[#fc00ff]/10 to-[#00dbde]/10 p-4 rounded-xl">
          <LocalOfferOutlinedIcon className="text-[#fc00ff]" />
          <span className="text-sm font-medium">Best Value</span>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-br from-[#fc00ff]/10 to-[#00dbde]/10 p-4 rounded-xl">
          <WhatshotOutlinedIcon className="text-[#fc00ff]" />
          <span className="text-sm font-medium">Trending</span>
        </div>
      </div>

      {/* Products */}
      <div
        ref={productsRef}
        className={`mt-4 md:mt-8
          ${
            productsEntry?.isIntersecting
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }
        `}
      >
        <ProductList products={filteredProducts} />
      </div>

      {/* Filter */}
      <ProductFilterSort
        categories={allCategories}
        selectedSort={sort}
        selectedCategories={selectedCategories}
        onSortChange={setSort}
        onCategoriesChange={setSelectedCategories}
        collectionId={id}
      />
    </div>
  );
}
