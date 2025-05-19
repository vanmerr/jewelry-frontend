import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Pagination from "@mui/material/Pagination";

export default function ProductList({ products, onAddToCart }) {
  // Xác định số sản phẩm mỗi hàng theo kích thước màn hình
  const [perRow, setPerRow] = useState(4);
  const [page, setPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setPerRow(4); // lg+
      else if (window.innerWidth >= 768) setPerRow(3); // md
      else if (window.innerWidth >= 640) setPerRow(2); // sm
      else setPerRow(1); // xs
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset về trang 1 khi danh sách sản phẩm thay đổi
  useEffect(() => {
    setPage(1);
  }, [products]);

  // Chia sản phẩm thành từng hàng
  const rows = [];
  for (let i = 0; i < products.length; i += perRow) {
    rows.push(products.slice(i, i + perRow));
  }

  // Lấy danh sách sản phẩm theo trang
  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="flex flex-col gap-10 mb-4">
      <div className="flex flex-col gap-10">
        {rows.map((row, idx) => (
          <div key={idx} className="flex gap-2 justify-center">
            {row.map((product) => (
              <div key={product.id} className="flex-1 min-w-0 max-w-xs">
                <ProductCard product={product} onAddToCart={onAddToCart} />
              </div>
            ))}
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