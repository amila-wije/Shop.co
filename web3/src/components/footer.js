import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-400">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Shop Section */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Shop</h3>
                        <ul className="mt-4 space-y-4">
                            <li><a href="/shop" className="hover:text-white">All Products</a></li>
                        </ul>
                    </div>

                    {/* Customer Care Section */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Customer Care</h3>
                        <ul className="mt-4 space-y-4">
                            <li><a href="#" className="hover:text-white">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white">FAQs</a></li>
                            <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
                            <li><a href="#" className="hover:text-white">Track Order</a></li>
                        </ul>
                    </div>

                    {/* Company Section */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-4">
                            <li><a href="#" className="hover:text-white">About Us</a></li>
                            <li><a href="#" className="hover:text-white">Sustainability</a></li>
                            <li><a href="#" className="hover:text-white">Store Locator</a></li>
                            <li><a href="#" className="hover:text-white">Careers</a></li>
                        </ul>
                    </div>

                    {/* Follow Us Section */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Follow Us</h3>
                        <div className="mt-4 flex space-x-6">
                            <a href="#" className="hover:text-white">
                                <span className="sr-only">Facebook</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                            </a>
                            <a href="#" className="hover:text-white">
                                <span className="sr-only">Instagram</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <circle cx="12" cy="12" r="3.2" />
                                    <path d="M16.5 2h-9A5.5 5.5 0 002 7.5v9A5.5 5.5 0 007.5 22h9a5.5 5.5 0 005.5-5.5v-9A5.5 5.5 0 0016.5 2zm3.1 14.5a3.1 3.1 0 01-3.1 3.1h-9a3.1 3.1 0 01-3.1-3.1v-9a3.1 3.1 0 013.1-3.1h9a3.1 3.1 0 013.1 3.1v9z" />
                                </svg>
                            </a>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Payment Methods</h3>
                            <div className="mt-4 flex space-x-4">
                                <div className="h-8 w-12 bg-gray-700 rounded">
                                    <img src="https://th.bing.com/th/id/OIP.xL03XjjZ7shCuc0VYH4jOwHaCR?rs=1&pid=ImgDetMain" alt="Visa" className="h-8 w-12 rounded" />
                                </div>
                                <div className="h-8 w-12 bg-gray-700 rounded">
                                    <img src="https://th.bing.com/th/id/OIP.vRQZ8vcw73umQSZ0Pg45HgHaFj?rs=1&pid=ImgDetMain" alt="PAYPAL" className="h-8 w-12 rounded" />
                                </div>
                                <div className="h-8 w-12 bg-gray-700 rounded">
                                    <img src="https://th.bing.com/th/id/OIP.2GBsE98iH4hZsEB-8DZqNQHaHa?rs=1&pid=ImgDetMain" alt="MasterCard" className="h-8 w-12 rounded" />
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-700 pt-8">
                    <p className="text-center">&copy; 2025 SHOP.CO, Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
