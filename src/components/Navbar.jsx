import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Badge from "@mui/material/Badge";
import TextField from "@mui/material/TextField";
import { useCart } from "../contexts/useCart";
import CartBag from "./CartBag";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { cart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = new URLSearchParams();
      if (search.trim()) query.set("search", search.trim());
      navigate(`/explore?${query.toString()}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-99999 backdrop-blur-xl bg-white/70 shadow-lg border-b border-gradient-to-r from-[#fc00ff]/30 via-white/60 to-[#00dbde]/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link to="/" className="font-serif text-3xl tracking-widest font-bold bg-gradient-to-br from-[#fc00ff] to-[#00dbde] bg-clip-text text-transparent drop-shadow-lg select-none">
          Desires
        </Link>
        {/* Desktop menu */}
        <div className="hidden lg:flex gap-8 items-center">
          {[
            { label: "Collections", to: "/explore?view=collections" },
            { label: "New Arrivals", to: "/collections?status=new" },
            { label: "Sale", to: "/collections?status=sale" },
            { label: "About", to: "/about" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="relative font-medium text-lg min-w-[120px] text-center flex items-center justify-center px-3 py-1 rounded-full transition-all duration-200 group hover:font-bold hover:text-white bg-gradient-to-br from-[#fc00ff]/0 to-[#00dbde]/0 hover:from-[#fc00ff]/80 hover:to-[#00dbde]/80 hover:shadow-xl"
            >
              <span className="transition-all group-hover:text-white w-full text-center">
                {item.label}
              </span>
              <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-[#fc00ff] to-[#00dbde] rounded-full transition-all duration-300 group-hover:w-3/4 group-hover:left-1/8"></span>
            </Link>
          ))}
          {/* Search */}
          <div className="flex items-center ml-4">
            <TextField
              label="Search..."
              variant="outlined"
              color="secondary"
              sx={{ minWidth: 120, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              className="bg-white/80 rounded-full shadow-sm"
            />
          </div>
        </div>
        {/* Right icons */}
        <div className="flex items-center gap-4 lg:gap-2">
          <button
            title="Cart"
            className="rounded-full bg-white/80 cursor-pointer hover:bg-gradient-to-br hover:from-[#fc00ff]/20 hover:to-[#00dbde]/20 shadow-md p-2 transition-all duration-200 relative group"
            onClick={() => setCartOpen(true)}
          >
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartOutlinedIcon className="text-[#fc00ff] group-hover:scale-110 transition-transform duration-200" />
            </Badge>
          </button>
          <Link
            to="/auth"
            title="User"
            className="rounded-full bg-white/80 cursor-pointer hover:bg-gradient-to-br hover:from-[#fc00ff]/20 hover:to-[#00dbde]/20 shadow-md p-2 transition-all duration-200 relative group max-sm:hidden"
          >
            <PersonOutlineOutlinedIcon className="text-[#00dbde] group-hover:scale-110 transition-transform duration-200" fontSize="medium" />
          </Link>
          <button
            className="lg:hidden md:block focus:outline-none rounded-full p-2 bg-white/80 shadow-md"
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
          >
            {!open ? (
              <MenuOutlinedIcon fontSize="large" />
            ) : (
              <CloseOutlinedIcon fontSize="large" />
            )}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-[#fc00ff]/20 shadow-xl lg:hidden flex flex-col gap-2 p-4 z-50 animate-fade-in-up">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="hover:bg-gradient-to-br from-[#fc00ff] to-[#00dbde] text-center py-2 rounded-full font-serif text-xl font-bold transition mb-1"
          >
            Home
          </Link>
          {[
            { label: "Collections", to: "/explore?view=collections" },
            { label: "New Arrivals", to: "/collections?status=new" },
            { label: "Sale", to: "/collections?status=sale" },
            { label: "About", to: "/about" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setOpen(false)}
              className="hover:bg-gradient-to-br from-[#fc00ff] to-[#00dbde] text-center py-2 rounded-full font-medium text-lg transition"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/account"
            onClick={() => setOpen(false)}
            className="md:hidden hover:bg-gradient-to-br from-[#fc00ff] to-[#00dbde] text-center py-2 rounded-full font-medium text-lg transition"
          >
            Account
          </Link>
          <div className="lg:hidden md:flex items-center bg-white p-4 rounded-xl shadow-md mt-2">
            <TextField
              label="Search..."
              variant="filled"
              color="error"
              sx={{ minWidth: 120, '& .MuiFilledInput-root': { border: 'none', backgroundColor: 'transparent' }, '& .MuiFilledInput-underline:before': { borderBottom: 'none' }, '& .MuiFilledInput-underline:after': { borderBottom: 'none' } }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full bg-gray-50 rounded-lg shadow-md p-2"
            />
          </div>
        </div>
      )}
      {/* CartBag Slide-in */}
      <CartBag
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onViewBag={() => {
          setCartOpen(false);
          // chuyển hướng sang trang giỏ hàng nếu muốn
        }}
      />
    </nav>
  );
}
