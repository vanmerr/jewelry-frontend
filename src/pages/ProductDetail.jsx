import { useParams } from "react-router-dom";
import products from "../services/products";
import ProductGallery from "../components/ProductGallery";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");

  if (!product) return <div className="p-8 text-center">Product not found.</div>;

  return (
    <div className="max-w-5xl mx-auto mt-[56px] py-12 px-4 flex flex-col md:flex-row gap-12">
      <div className="flex-1">
        <ProductGallery image={product.image} />
      </div>
      <div className="flex-1 flex flex-col gap-6">
        <h1 className="font-serif text-3xl font-bold text-black">{product.name}</h1>
        <span className="text-2xl font-bold">${product.price}</span>
        <p className="text-lg text-gray-700">{product.description}</p>
        {product.sizes.length > 0 && (
          <div>
            <label className="block mb-2 font-semibold">Size:</label>
            <select
              value={selectedSize}
              onChange={e => setSelectedSize(e.target.value)}
              className="border rounded px-3 py-2"
            >
              {product.sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        )}
        <button className="bg-black text-white px-6 py-3 rounded font-semibold transition mt-4">
          Add to Cart
        </button>
      </div>
    </div>
  );
}