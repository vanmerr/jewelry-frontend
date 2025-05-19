export default function ProductGallery({ image }) {
  return (
    <div className="w-full flex justify-center items-center">
      <img src={image} alt="Product" className="rounded-lg shadow-lg max-h-96 object-contain" />
    </div>
  );
}