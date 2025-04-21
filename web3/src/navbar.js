import React from 'react';
import { ShoppingCart, Search, User, Heart, Menu, X, ChevronDown, ChevronRight, Import } from 'lucide-react';
import { useState } from 'react';
function Nav(){

    const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [cartCount, setCartCount] = useState(0);
      
      
    return (
 <nav className="bg-white shadow">
 <div className="max-w-7xl mx-auto px-4">
   <div className="flex justify-between h-16">
     <div className="flex items-center">
       <div className="hidden md:block">
         <div className="flex items-baseline space-x-4">
           <a href="/home" className="font-medium text-gray-900 hover:text-indigo-600 px-3 py-2">Home</a>
           
           <a href="#" className="font-medium text-gray-600 hover:text-indigo-600 px-3 py-2">About</a>
           <a href="/" className="font-medium text-gray-600 hover:text-indigo-600 px-3 py-2">Logout</a> 
           <a href="/seller" className="font-medium text-gray-600 hover:text-indigo-600 px-3 py-2">i'm a seller</a>
         </div>
       </div>
     </div>
     
     <div className="flex-shrink-0 flex items-center">
       <h1 className="text-2xl font-bold text-indigo-600">SHOP.CO</h1>
     </div>
     
     <div className="flex items-center">
       <div className="hidden md:flex items-center space-x-4">
         <div className="relative">
           <input
             type="text"
             placeholder="Search..."
             className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
           />
           <div className="absolute left-3 top-2">
             <Search className="h-5 w-5 text-gray-400" />
           </div>
         </div>
         <a href="/user" className="text-gray-600 hover:text-indigo-600">
           <User className="h-6 w-6" />
         </a>
         
         <div className="relative">
           <a href="#" className="text-gray-600 hover:text-indigo-600">
             <ShoppingCart className="h-6 w-6" />
             {cartCount > 0 && (
               <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                 {cartCount}
               </span>
             )}
           </a>
         </div>
       </div>
       
       <div className="md:hidden flex items-center">
         <button
           onClick={() => setIsMenuOpen(!isMenuOpen)}
           className="text-gray-600 hover:text-indigo-600 focus:outline-none"
         >
           {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
         </button>
       </div>
     </div>
   </div>
 </div>
 
 {/* Mobile menu */}
 {isMenuOpen && (
   <div className="md:hidden">
     <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
       <a href="/home" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-indigo-600">Home</a>
       <a href="#" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-600">About</a>
       <a href="/" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-600">Logout</a>
     </div>
     <div className="pt-4 pb-3 border-t border-gray-200">
       <div className="flex items-center px-5">
         <div className="flex-shrink-0">
           <User className="h-6 w-6 text-gray-600" />
         </div>
         <div className="ml-3">
           <div className="text-base font-medium text-gray-800">Account</div>
         </div>
       </div>
       <div className="mt-3 px-2 space-y-1">
         <a href="#" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-600">Your Profile</a>
         <a href="#" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-600">Settings</a>
         <a href="/" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-600">Sign out</a>
       </div>
     </div>
   </div>
 )}
</nav>
);
}
export default Nav;