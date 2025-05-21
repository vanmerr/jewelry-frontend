import { useRef, useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Pagination from "@mui/material/Pagination";

export default function ProductList({ products, onAddToCart }) {
  const [page, setPage] = useState(1);
  const productsPerPage = 8;
  const listRef = useRef(null);

  useEffect(() => {
    setPage(1);
  }, [products]);

  // Scroll to top of list when page changes
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [page]);

  // Lấy danh sách sản phẩm theo trang
  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div ref={listRef} className="flex flex-col gap-10 mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentProducts.map((product, idx) => (
          <div key={product.id + '-' + idx} className="flex-1 min-w-0 max-w-xs mx-auto">
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
      {Math.ceil(products.length / productsPerPage) > 1 && (
        <Pagination
          count={Math.ceil(products.length / productsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
          variant="outlined"
          shape="rounded"
          className="self-center mb-8 mt-4"
        />
      )}
    </div>
  );
}