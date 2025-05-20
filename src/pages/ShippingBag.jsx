import React, { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

const ShippingBag = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Diamond Pendant",
      price: 1299.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "18K Gold Diamond Pendant with VS1 Clarity",
    },
    {
      id: 2,
      name: "Gold Chain",
      price: 899.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1611652022419-a9419f743f7c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description: "24K Gold Chain with Italian Design",
    },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 15;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-4xl font-serif text-gray-900 mb-4">Your Shopping Bag is Empty</h1>
          <p className="text-gray-600 mb-8">Discover our exquisite collection of fine jewelry</p>
          <button className="bg-black text-white py-3 px-8 rounded-full hover:bg-gray-800 transition-colors duration-200">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif text-gray-900 mb-8 text-center">Your Shopping Bag</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-6 border-b border-gray-100 pb-6">
                  <div className="w-32 h-32 relative overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-serif text-gray-900">{item.name}</h3>
                    <p className="text-gray-500 mt-1">{item.description}</p>
                    <p className="text-gray-500 mt-1">${item.price.toFixed(2)}</p>
                    <div className="flex items-center space-x-4 mt-4">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="text-gray-900 font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="ml-4 text-red-500 hover:text-red-600 transition-colors duration-200"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-serif text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-serif text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-serif text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full bg-black text-white py-4 px-6 rounded-full hover:bg-gray-800 transition-colors duration-200 mt-6 flex items-center justify-center space-x-2">
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-4 px-6 rounded-full hover:bg-gray-50 transition-colors duration-200">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingBag; 