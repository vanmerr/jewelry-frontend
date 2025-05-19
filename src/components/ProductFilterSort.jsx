import { useState } from "react";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const STATUSES = [
  { value: "", label: "All" },
  { value: "luxury", label: "Luxury" },
  { value: "featured", label: "Featured" },
  { value: "new", label: "New" },
  { value: "best-seller", label: "Best Seller" },
  { value: "limited-edition", label: "Limited Edition" },
  { value: "trending", label: "Trending" },
  { value: "popular", label: "Popular" },
];

const SORTS = [
  { value: "asc", label: "Price: Low to High" },
  { value: "desc", label: "Price: High to Low" },
];

export default function ProductFilterSort({
  categories = [],
  selectedSort,
  selectedStatus,
  selectedCategories,
  onSortChange,
  onStatusChange,
  onCategoriesChange,
}) {
  const [sort, setSort] = useState(selectedSort || "");
  const [status, setStatus] = useState(selectedStatus || "");
  const [cats, setCats] = useState(selectedCategories || []);
  const [open, setOpen] = useState(true);

  const handleSort = (e) => {
    setSort(e.target.value);
    onSortChange && onSortChange(e.target.value);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
    onStatusChange && onStatusChange(e.target.value);
  };

  const handleCategory = (e) => {
    const value = e.target.value;
    let newCats;
    if (e.target.checked) {
      newCats = [...cats, value];
    } else {
      newCats = cats.filter((c) => c !== value);
    }
    setCats(newCats);
    onCategoriesChange && onCategoriesChange(newCats);
  };

  return (
    <div>
      {/* Filter Toggle Button */}
      <button
        className="fixed right-2 bottom-[25vh] z-50 bg-gradient-to-br from-[#fc00ff] to-[#00dbde] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-all"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle filter"
        type="button"
      >
        {open ? <CloseOutlinedIcon fontSize="medium" /> : <FilterAltOutlinedIcon fontSize="medium" />}
      </button>
      {/* Filter Panel */}
      <div
        className={`fixed right-20  max-sm:right-15 bottom-[15vh] z-60 min-w-[260px] max-w-[90vw] bg-white/95 border border-gray-200 rounded-xl shadow-2xl p-5 transition-all duration-300
        ${open ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-20"}
        `}
        style={{ backdropFilter: "blur(8px)" }}
      >
        <div className="flex flex-col gap-4">
          {/* Sort */}
          <div className="flex items-center gap-2">
            <label className="w-20 font-semibold text-gray-700">Sort by</label>
            <select
              value={sort}
              onChange={handleSort}
              className="w-48 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
            >
              <option value="">Default</option>
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          {/* Status filter */}
          <div className="flex items-center gap-2">
            <label className="w-20 font-semibold text-gray-700">Status</label>
            <select
              value={status}
              onChange={handleStatus}
              className="w-48 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
            >
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          {/* Category multi-select */}
          <div>
            <label className="mr-2 font-semibold text-gray-700">Category</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="inline-flex items-center gap-1 bg-gradient-to-br from-[#fc00ff]/10 to-[#00dbde]/10 px-2 py-1 rounded-full border border-gray-200 text-gray-700 text-sm cursor-pointer hover:bg-pink-50 transition"
                >
                  <input
                    type="checkbox"
                    value={cat}
                    checked={cats.includes(cat)}
                    onChange={handleCategory}
                    className="accent-pink-500"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}