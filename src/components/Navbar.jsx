import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Badge from "@mui/material/Badge";
import TextField from "@mui/material/TextField";
import { useCart } from "../contexts/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();

  // Lấy status hiện tại từ query string nếu có
  const params = new URLSearchParams(location.search);
  const status = params.get("status");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = new URLSearchParams();
      if (status) query.set("status", status);
      if (search.trim()) query.set("search", search.trim());
      navigate(`/collections?${query.toString()}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black px-4 py-3 flex items-center justify-between shadow-lg z-50">
      <Link to="/" className="font-serif text-2xl tracking-widest font-bold">
        Desires
      </Link>
      <div className="flex items-center gap-8 md:gap-4">
        {/* Desktop menu */}
        <div className="hidden lg:flex gap-8 items-center">
          <Link
            to="/collections"
            className="font-light transition relative flex items-center group hover:font-bold"
          >
            <span className="ml-1  transition">
              Collections
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-br from-[#fc00ff] to-[#00dbde] transition-all group-hover:w-full"></span>
          </Link>
          <Link
            to="/collections?status=new"
            className="font-light transition flex items-center relative group hover:font-bold"
          >
            <span className="ml-1">New Arrivals</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-br from-[#fc00ff] to-[#00dbde] transition-all group-hover:w-full"></span>
          </Link>
          <Link
            to="/collections?status=sale"
            className="font-light transition px-1 flex items-center relative group hover:font-bold"
          >
            <span className="ml-1">Sale</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-br from-[#fc00ff] to-[#00dbde] transition-all group-hover:w-full"></span>
          </Link>
          <Link
            to="/about"
            className="font-light transition flex items-center relative group hover:font-bold"
          >
            <span className="ml-1">About</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-br from-[#fc00ff] to-[#00dbde] transition-all group-hover:w-full"></span>
          </Link>
          {/* Ô tìm kiếm sử dụng MUI */}
          <div className=" lg:flex items-center md:flex sm:flex">
            <TextField
              label="Search..."
              variant="outlined"
              color="secondary"
              sx={{ minWidth: 120 }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>
        <div className="flex items-center gap-8 md:gap-4 lg:gap-2">
          <button
            title="Cart"
            className="font-light hover:font-bold -mr-1 md:mr-2 lg:mr-4 lg:ml-4 transition cursor-pointer relative group"
          >
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartOutlinedIcon />
            </Badge>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-br from-[#fc00ff] to-[#00dbde] transition-all group-hover:w-full"></span>
          </button>
          <button
            title="User"
            className="hover:font-medium font-light -mr-1 max-sm:hidden  md:mr-2 lg:mr-4 lg:ml-4 transition cursor-pointer relative group"
          >
            <PersonOutlineOutlinedIcon fontSize="medium" />
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-br from-[#fc00ff] to-[#00dbde] transition-all group-hover:w-full"></span>
          </button>
          <button
            className="lg:hidden md:block focus:outline-none"
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
        <div className="absolute top-full text-white left-0 w-full bg-black/90 lg:hidden flex flex-col gap-2 p-4 z-50 border-t animate-fade-in">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="hover:bg-gradient-to-br from-[#fc00ff] to-[#00dbde] text-center py-1 transition rounded-lg"
          >
            Home
          </Link>
          <Link
            to="/collections"
            onClick={() => setOpen(false)}
            className="hover:bg-gradient-to-br from-[#fc00ff] to-[#00dbde] text-center py-1 transition rounded-lg"
          >
            Collections
          </Link>
          <Link
            to="/collections?status=new"
            onClick={() => setOpen(false)}
            className="hover:bg-gradient-to-br from-[#fc00ff] to-[#00dbde] text-center py-1 transition rounded-lg"
          >
            New Arrivals
          </Link>
          <Link
            to="/collections?status=sale"
            onClick={() => setOpen(false)}
            className="hover:bg-gradient-to-br from-[#fc00ff] to-[#00dbde] text-center py-1 transition rounded-lg"
          >
            Sale
          </Link>
          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="hover:bg-gradient-to-br from-[#fc00ff] to-[#00dbde] text-center py-1 transition rounded-lg"
          >
            About
          </Link>
          <Link
            to="/account"
            onClick={() => setOpen(false)}
            className="md:hidden hover:bg-gradient-to-br from-[#fc00ff] to-[#00dbde] text-center py-1 transition rounded-lg"
          >
            Account
          </Link>
          <div className="lg:hidden md:flex items-center bg-white p-4 sm:p-0 rounded-lg shadow-md">
            <TextField
              label="Search..."
              variant="filled"
              color="error"
              sx={{ minWidth: 120 }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full  bg-gray-50 rounded-lg shadow-md p-2"

            />
          </div>
        </div>
      )}
    </nav>
  );
}
