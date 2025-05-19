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

export default function CollectionDetails() {
  const { id } = useParams();
  const collection = collections.find((c) => c.id === Number(id));
  const collectionProducts = products.filter(
    (p) => p.collectionId === Number(id)
  );

  return (
    <div className="w-full mx-auto mt-6 sm:mt-10 md:mt-[60px] lg:mt-[80px] px-2 sm:px-4 md:px-8">
      <div className="relative flex flex-col md:flex-row h-auto md:h-[260px] lg:h-[300px] items-center bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={collection.banner}
          alt={collection.name}
          className="w-full md:w-[60%] h-[180px] md:h-full object-cover"
        />
        <div className="p-3 md:p-4 flex flex-col gap-2 w-full md:w-[40%]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light truncate">
            {collection.name}
          </h2>
          <span className="text-[15px] sm:text-[16px] md:text-[18px] font-extralight line-clamp-3">
            {collection.description}
          </span>
        </div>
        <span className="absolute flex items-center text-gray-800 text-[13px] sm:text-[15px] md:text-[16px] right-2 top-2 md:right-3 md:top-3 bg-gradient-to-br from-[#fc00ff]/70 to-[#00dbde]/70 text-xs font-light px-2 py-2 rounded shadow-lg z-20 animate-bounce">
          {collection.status === "featured" && (
            <EmojiEventsOutlinedIcon
              fontSize="small"
              className="text-orange-500 mr-0.5"
            />
          )}
          {collection.status === "luxury" && (
            <DiamondOutlinedIcon
              fontSize="small"
              className="text-blue-700 mr-0.5"
            />
          )}
          {collection.status === "limited-edition" && (
            <LocalOfferOutlinedIcon
              fontSize="small"
              className="text-red-500 mr-0.5"
            />
          )}
          {collection.status === "best-seller" && (
            <WhatshotOutlinedIcon
              fontSize="small"
              className="text-red-500 mr-0.5"
            />
          )}
          {collection.status.charAt(0).toUpperCase() +
            collection.status.slice(1)}
        </span>
      </div>
      <div className="w-full md:w-[90%] m-auto flex h-10 items-center mt-4 md:mt-8">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to="/"
            className="relative text-gray-400 hover:text-gray-800 font-light group"
          >
            <span> Home</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-br from-[#fc00ff] to-[#00dbde] transition-all group-hover:w-full"></span>
          </Link>
          <Link
            to="/collections"
            className="relative text-gray-400 hover:text-gray-800 font-light group"
          >
            <span>All Collection</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-br from-[#fc00ff] to-[#00dbde] transition-all group-hover:w-full"></span>
          </Link>
          <span className="text-gray-800">{collection.name}</span>
        </Breadcrumbs>
      </div>
      <div className="mt-4 md:mt-8">
        <ProductList products={collectionProducts} />
      </div>
      <ProductFilterSort categories={collection.categories || ["Watch"]} />
    </div>
  );
}
