import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import CollectionDetails from "./pages/CollectionDetails";
import Explore from './pages/Explore';
import ShippingBag from "./pages/ShippingBag";
import ScrollToTop from "./components/ScrollToTop";
import Auth from "./pages/Auth";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes> 
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/collection/:id" element={<CollectionDetails />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/shipping-bag" element={<ShippingBag />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}