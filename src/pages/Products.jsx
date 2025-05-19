import products from "../services/products";
import Pagination from "@mui/material/Pagination";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import ProductCard from "../components/ProductCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Products() {
  const query = useQuery();
  const status = query.get("status");
  const search = query.get("search") || "";

  let filteredProducts = status === "new"
    ? products.filter((p) => p.status === "new")
    : status === "sale"
      ? products.filter((p) => p.discount > 0)
      : products;

  // Lọc theo search
  if (search.trim() !== "") {
    const lower = search.trim().toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower)
    );
  }

  const [page, setPage] = useState(1);

  // Xác định số sản phẩm mỗi trang theo kích thước màn hình
  const [productsPerPage, setProductsPerPage] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setProductsPerPage(9); // Tablet (md)
      } else {
        setProductsPerPage(8); // Mobile & Desktop mặc định
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { addToCart } = useCart();

  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  const handleChange = (event, value) => setPage(value);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  let title = "Our Collection";
  if (status === "new") title = "New Arrivals";
  if (status === "hot") title = "Sale";

  return (
    <div className="max-w-7xl mx-auto py-8 px-2 sm:px-4 md:px-6 mt-[56px]">
      <h2 className="font-serif text-3xl text-black mb-8 font-bold text-center">
        {title}
      </h2>
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 py-16 text-lg">
          No products found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
          {pageCount > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                count={pageCount}
                page={page}
                onChange={handleChange}
                color="secondary"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}