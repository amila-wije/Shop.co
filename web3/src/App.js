import { useState } from 'react';
import { ShoppingCart, Search, User, Heart, Menu, X, ChevronDown, ChevronRight, Import } from 'lucide-react';
import Footer from './components/footer';
import Nav from './navbar';
export default function EcommercePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  
  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div>
        <Nav />
        <div>
          <div className="bg-indigo-50">
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
                <div className="order-1 lg:order-1">
                  <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                    Summer Collection
                  </h2>
                  <p className="mt-4 text-xl text-gray-600">
                    Discover our latest collection of summer essentials designed for comfort and style.
                  </p>
                  <div className="mt-8">
                    <a
                      href="/shop"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Shop Now
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </a>
                  </div>
                </div>
                <div className="mt-10 lg:mt-0 order-2 lg:order-2">
                  <div className="aspect-w-5 aspect-h-6">
                    <img
                      src="https://th.bing.com/th/id/OIP.zRqXpXcVRcPsF-f3p8e44QHaE7?w=1480&h=986&rs=1&pid=ImgDetMain"
                      alt="Summer collection"
                      className="rounded-lg shadow-xl object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}