import { useState } from "react";
import { Trash2, Plus, X, Upload, ShoppingBag, LayoutGrid, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const API_URL = "http://localhost:5000/api";

export  function SellerInventoryManagement() {
    const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [view, setView] = useState("/shop"); // "inventory" or "shop"
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    brand: "",
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch items from MongoDB on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/items`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      
      const data = await response.json();
      setItems(data);
      setError(null);
    } catch (err) {
      setError('Error loading items. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewItem({ ...newItem, image: file });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newItem.name);
      formData.append('brand', newItem.brand);
      formData.append('price', newItem.price);
      
      if (newItem.image) {
        formData.append('image', newItem.image);
      }
      
      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to add item');
      }
      
      const addedItem = await response.json();
      setItems([...items, addedItem]);
      resetForm();
      setShowAddModal(false);
    } catch (err) {
      setError('Error adding item. Please try again.');
      console.error(err);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      setError('Error deleting item. Please try again.');
      console.error(err);
    }
  };

  const resetForm = () => {
    setNewItem({
      name: "",
      price: "",
      brand: "",
      image: null
    });
    setImagePreview(null);
  };

  const closeModal = () => {
    resetForm();
    setShowAddModal(false);
  };

  const handleLogout = () => {
    // In a real application, this would handle logout logic
    alert("Logout functionality would be implemented here");
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-blue-700">Seller Hub</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setView("inventory")}
                className={`px-3 py-2 rounded-md flex items-center ${view === "inventory" ? "bg-blue-100 text-blue-800" : "text-gray-600 hover:bg-gray-100"}`}
              >
                <LayoutGrid size={18} className="mr-2" />
                Inventory
              </button>
              <button 
                onClick={() => setView("shop")}
                className={`px-3 py-2 rounded-md flex items-center ${view === "shop" ? "bg-blue-100 text-blue-800" : "text-gray-600 hover:bg-gray-100"}`}
              >
                <ShoppingBag size={18} className="mr-2" />
                Shop View
              </button>
              <div className="h-6 border-l border-gray-300 mx-2"></div>
              <button 
                onClick={handleLogout}
                className="px-3 py-2 rounded-md flex items-center text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        {/* Error Alert */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-700 hover:text-red-900">
              <X size={18} />
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : view === "inventory" ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
              <button 
                onClick={() => setShowAddModal(true)} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
              >
                <Plus size={20} className="mr-2" />
                Add Item
              </button>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">No items in your inventory yet</p>
                <button 
                  onClick={() => setShowAddModal(true)} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Add your first item
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <div key={item._id} className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-blue-700">{item.brand}</span>
                      <button 
                        onClick={() => deleteItem(item._id)} 
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="h-24 w-24 bg-gray-200 rounded-md overflow-hidden mr-4">
                        <img 
                          src={item.imageUrl || "/api/placeholder/100/100"} 
                          alt={item.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                        <p className="text-green-600 font-bold">${item.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Shop</h1>
              
              {items.length === 0 ? (
                <div className="text-center py-10">
                  <ShoppingBag size={40} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 mb-2">No products available</p>
                  <p className="text-gray-500">Add items to your inventory to display them in your shop</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {items.map((item) => (
                    <div key={item._id} className="group bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 transition-all hover:shadow-lg">
                      <div className="h-48 overflow-hidden bg-gray-200">
                        <img 
                          src={item.imageUrl || "/api/placeholder/100/100"} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-blue-600 font-medium mb-1">{item.brand}</p>
                        <h3 className="font-semibold text-gray-800 mb-2">{item.name}</h3>
                        <div className="flex justify-between items-center">
                          <p className="text-lg font-bold text-gray-900">${item.price}</p>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded">
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Item</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Item Name</label>
                <input
                  type="text"
                  name="name"
                  value={newItem.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Product name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={newItem.brand}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brand name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={newItem.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                  {imagePreview ? (
                    <div className="relative w-full">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto h-40 object-contain"
                      />
                      <button
                        onClick={() => {
                          setImagePreview(null);
                          setNewItem({ ...newItem, image: null });
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <div className="flex flex-col items-center">
                        <Upload className="h-12 w-12 text-gray-400 mb-2" />
                        <span className="text-gray-500">Click to upload an image</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={addItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  disabled={!newItem.name || !newItem.price}
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default SellerInventoryManagement;