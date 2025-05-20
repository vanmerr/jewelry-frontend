import { useState, useEffect } from "react";
import CollectionCard from "./CollectionCard";

export default function CollectionList({ collections }) {
  const [page, setPage] = useState(1);
  const collectionsPerPage = 4;

  useEffect(() => {
    setPage(1);
  }, [collections]);

  // Lấy danh sách collection theo trang
  const indexOfLast = page * collectionsPerPage;
  const indexOfFirst = indexOfLast - collectionsPerPage;
  const currentCollections = collections.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(collections.length / collectionsPerPage);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  if (!collections || collections.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[200px] text-gray-500 text-lg">
        No collections found
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-10 mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentCollections.map((collection, idx) => (
          <CollectionCard key={collection.id + '-' + idx} collection={collection} />
        ))}
      </div>
      {totalPages > 1 && (
        <>
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-white shadow-lg text-gray-700 font-semibold transition-all duration-200 hover:scale-110 ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
          >
            ←
          </button>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 px-6 py-2 rounded-full bg-white shadow-lg text-gray-700 font-semibold transition-all duration-200 hover:scale-110 ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
          >
            →
          </button>
        </>
      )}
    </div>
  );
}
