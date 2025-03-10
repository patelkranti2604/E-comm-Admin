import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Product = () => {
    const [products, setProducts] = useState([]);
    const accessToken=localStorage.getItem("accessToken")
    const [categories, setCategories] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: "",
        category: "",
        price: "",
        stock: "",
        image: null,
    });

    // Fetch products
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/admin-products/",{headers: {
            Authorization: `Bearer ${accessToken}`, // Pass JWT token in the header
            "Content-Type": "application/json",
          },})

            .then(response => setProducts(response.data))
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    // Fetch categories
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/admin-categories/",{headers: {
            Authorization: `Bearer ${accessToken}`, // Pass JWT token in the header
            "Content-Type": "application/json",
          },})
            .then(response => setCategories(response.data))
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    const createProduct = async () => {
        try {
            const formData = new FormData();
            formData.append("name", newProduct.name);
            formData.append("category", newProduct.category); // Category ID
            formData.append("price", newProduct.price);
            formData.append("stock", newProduct.stock);
            if (newProduct.image) {
                formData.append("image", newProduct.image);
            }

            const res = await axios.post("http://127.0.0.1:8000/admin-products/", formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Pass JWT token in the header
                    "Content-Type": "application/json",
                  },            });

            console.log("Product Created:", res.data);
            setProducts([...products, res.data]);
            setNewProduct({ name: "", category: "", price: "", stock: "", image: null });
        } catch (e) {
            console.error("Error creating product:", e.response?.data || e.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Product Management</h1>

                {/* Product Form */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-50 p-4 rounded-lg shadow-md mb-6"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Animated Input Fields */}
                        {["name", "price", "stock"].map((field) => (
                            <motion.div key={field} className="relative">
                                <motion.label
                                    className={`absolute left-3 text-gray-500 transition-all ${
                                        newProduct[field] ? "-top-3 text-xs bg-white px-1" : "top-2"
                                    }`}
                                >
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </motion.label>
                                <input
                                    type={field === "price" || field === "stock" ? "number" : "text"}
                                    value={newProduct[field]}
                                    onChange={(e) => setNewProduct({ ...newProduct, [field]: e.target.value })}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                                />
                            </motion.div>
                        ))}

                        {/* Category Selection */}
                        <motion.div className="relative">
                            <motion.label
                                className={`absolute left-3 text-gray-500 transition-all ${
                                    newProduct.category ? "-top-3 text-xs bg-white px-1" : "top-2"
                                }`}
                            >
                                Select Category
                            </motion.label>
                            <select
                                value={newProduct.category}
                                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                            >
                                <option value=""></option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </motion.div>
                    </div>

                    {/* Image Upload */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                        <div className="mt-2 flex items-center space-x-4">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
                                className="p-2 border rounded-md"
                            />
                            {newProduct.image && (
                                <img
                                    src={URL.createObjectURL(newProduct.image)}
                                    alt="Preview"
                                    className="w-16 h-16 rounded-lg object-cover border"
                                />
                            )}
                        </div>
                    </div>

                    <button
                        onClick={createProduct}
                        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                    >
                        Add Product
                    </button>
                </motion.div>

                {/* Product List */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <h2 className="text-xl font-semibold mb-4">Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {products.map((product) => (
                            <motion.div
                                key={product.id}
                                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    src={`http://127.0.0.1:8000${product.image}`}
                                    alt={product.name}
                                    className="w-24 h-24 object-cover rounded-lg border mb-2"
                                />
                                <p className="text-lg font-semibold">{product.name}</p>
                                <p className="text-gray-500 text-sm">
                                    {categories.find(cat => cat.id === product.category)?.name || "Unknown Category"}
                                </p>
                                <p className="text-blue-500 font-bold">${product.price}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Product;
