import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import CollectionDetails from "./pages/CollectionDetails";

export default function App() {
  return (
    <Router>
      <div className="bg-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes> 
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/collection/:id" element={<CollectionDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}