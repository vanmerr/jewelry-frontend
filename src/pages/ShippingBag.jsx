import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/useCart';
import { Link } from 'react-router-dom';

const ShippingBag = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [isSummarySticky, setIsSummarySticky] = useState(false);
  const [summaryRef, setSummaryRef] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!summaryRef) return;

      const rect = summaryRef.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Nếu phần summary đã scroll qua khỏi viewport
      if (rect.top < 0) {
        // Nếu phần summary chưa scroll hết
        if (rect.bottom > windowHeight) {
          setIsSummarySticky(true);
        } else {
          setIsSummarySticky(false);
        }
      } else {
        setIsSummarySticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Gọi handleScroll ngay khi component mount để set trạng thái ban đầu
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [summaryRef]);

  const handleUpdateQuantity = (item, change) => {
    updateQuantity(item.id, item.selectedColor, item.selectedSize, change);
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id, item.selectedColor, item.selectedSize);
  };

  const subtotal = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  const shipping = 15;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br mt-[56px] from-gray-50 via-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-[#fc00ff]/20 to-[#00dbde]/20 rounded-full animate-pulse"></div>
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 relative z-10" />
          </div>
          <h1 className="text-4xl font-serif mb-4 bg-gradient-to-br from-[#fc00ff] to-[#00dbde] bg-clip-text text-transparent">Your Shopping Bag is Empty</h1>
          <p className="text-gray-600 mb-8">Discover our exquisite collection of fine jewelry</p>
          <Link to="/explore" className="inline-block bg-gradient-to-br from-[#fc00ff] to-[#00dbde] text-white py-3 px-8 rounded-full hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 mt-[56px] via-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif text-center mb-8 bg-gradient-to-br from-[#fc00ff] to-[#00dbde] bg-clip-text text-transparent">Your Shopping Bag</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 space-y-6">
              {cart.map((item) => (
                <div key={item.id + (item.selectedColor || "") + (item.selectedSize || "")} 
                     className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 border-b border-gray-100 pb-6 group hover:bg-white/50 transition-all duration-300 rounded-xl p-4">
                  <div className="w-full sm:w-32 h-48 sm:h-32 relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <img
                      src={item.images?.[0] || item.image}
                      alt={item.name}
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <h3 className="text-xl font-serif text-gray-900 group-hover:text-[#fc00ff] transition-colors duration-300">{item.name}</h3>
                    <p className="text-gray-500 mt-1">${item.price.toLocaleString()}</p>
                    {item.selectedColor && <p className="text-sm text-gray-500">Color: {item.selectedColor}</p>}
                    {item.selectedSize && <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>}
                    <div className="flex items-center justify-between sm:justify-start space-x-4 mt-4">
                      <div className="flex items-center space-x-4">
                      <button 
                          onClick={() => handleUpdateQuantity(item, -1)}
                          className="p-2 rounded-full hover:bg-gradient-to-br hover:from-[#fc00ff]/20 hover:to-[#00dbde]/20 transition-all duration-300"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                        <span className="text-gray-900 font-medium">{item.quantity || 1}</span>
                      <button 
                          onClick={() => handleUpdateQuantity(item, 1)}
                          className="p-2 rounded-full hover:bg-gradient-to-br hover:from-[#fc00ff]/20 hover:to-[#00dbde]/20 transition-all duration-300"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                      </div>
                      <button 
                        onClick={() => handleRemoveItem(item)}
                        className="text-red-500 hover:text-red-600 transition-colors duration-300"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right w-full sm:w-auto">
                    <p className="text-xl font-serif text-red-500">
                      ${((item.price * (item.quantity || 1)).toLocaleString())}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div 
              ref={setSummaryRef}
              className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 transition-all duration-300
                ${isSummarySticky ? 'fixed bottom-0 left-0 right-0 z-50  lg:sticky lg:top-8' : 'lg:sticky lg:top-8'}`}
              style={{
                maxWidth: isSummarySticky ? '100%' : 'auto',
                margin: isSummarySticky ? '0' : 'auto',
                borderRadius: isSummarySticky ? '1rem 1rem 0 0' : '1rem',
                padding: isSummarySticky ? '1.5rem' : '1.5rem',
              }}
            >
              <h2 className="text-2xl font-serif mb-6 bg-gradient-to-br from-[#fc00ff] to-[#00dbde] bg-clip-text text-transparent">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>${shipping.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-serif">
                    <span className="bg-gradient-to-br from-[#fc00ff] to-[#00dbde] bg-clip-text text-transparent">Total</span>
                    <span className="bg-gradient-to-br from-[#fc00ff] to-[#00dbde] bg-clip-text text-transparent">${total.toLocaleString()}</span>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-br from-[#fc00ff] to-[#00dbde] text-white py-4 px-6 rounded-full hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg mt-6 flex items-center justify-center space-x-2">
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <Link to="/explore" className="w-full border border-gray-300 text-gray-700 py-4 px-6 rounded-full hover:bg-gradient-to-br hover:from-[#fc00ff]/10 hover:to-[#00dbde]/10 transition-all duration-300 block text-center">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingBag; 