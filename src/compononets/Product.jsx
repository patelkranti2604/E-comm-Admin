import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Product() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false); // Flag to toggle between view and edit mode
    const [currentProduct, setCurrentProduct] = useState(null); // Store current product to edit
    const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "", stock: "", sizes: [], image: "" }); // For new product form
    const API = "http://127.0.0.1:8000/admin-products/";
    const accessToken = localStorage.getItem("accessToken");
    const navigate = useNavigate();

    // Fetch data from API
    const getAPI = async () => {
        setIsLoading(true);
        setErrorMessage("");
        try {
            const res = await axios.get(API, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setData(res.data);
            console.log(res.data);
        } catch (e) {
            setErrorMessage("Failed to fetch products.");
            console.error("Error fetching data:", e);
        } finally {
            setIsLoading(false);
        }
    };

    // Create a new product
    const createProduct = async () => {
        try {
            const res = await axios.post(API, newProduct, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setData([...data, res.data]);
            setNewProduct({ name: "", description: "", price: "", stock: "", sizes: [], image: "" }); // Clear form
        } catch (e) {
            console.error("Error creating product:", e);
        }
    };

    // Edit product
    const editProduct = (product) => {
        setCurrentProduct(product);
        setIsEditing(true); // Switch to edit mode
    };

    // Update a product
    const updateProduct = async () => {
        try {
            const res = await axios.put(`${API}${currentProduct.id}/`, currentProduct, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const updatedData = data.map((item) =>
                item.id === currentProduct.id ? res.data : item
            );
            setData(updatedData);
            setIsEditing(false); // Exit edit mode
        } catch (e) {
            console.error("Error updating product:", e);
        }
    };

    // Delete a product
    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`${API}${productId}/`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setData(data.filter((item) => item.id !== productId));
        } catch (e) {
            console.error("Error deleting product:", e);
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (accessToken) {
            getAPI(); // Fetch data if logged in
        } else {
            navigate("/login"); // Redirect to login if no access token
        }
    }, [accessToken, navigate]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Product Management</h1>
            <div className="mb-6">
                {/* Create New Product */}
                {!isEditing && (
                    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
                        <input
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleChange}
                            className="block w-full p-2 border border-gray-300 rounded-lg mb-2"
                            placeholder="Product Name"
                        />
                        <textarea
                            name="description"
                            value={newProduct.description}
                            onChange={handleChange}
                            className="block w-full p-2 border border-gray-300 rounded-lg mb-2"
                            placeholder="Product Description"
                        />
                        <input
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={handleChange}
                            className="block w-full p-2 border border-gray-300 rounded-lg mb-2"
                            placeholder="Product Price"
                        />
                        <input
                            type="number"
                            name="stock"
                            value={newProduct.stock}
                            onChange={handleChange}
                            className="block w-full p-2 border border-gray-300 rounded-lg mb-2"
                            placeholder="Stock"
                        />
                         <input
                            type="number"
                            name="Category"
                            value={newProduct.Category}
                            onChange={handleChange}
                            className="block w-full p-2 border border-gray-300 rounded-lg mb-2"
                            placeholder="Category"
                        />
                         <input
                            type="text"
                            name="brand"
                            value={newProduct.brand}
                            onChange={handleChange}
                            className="block w-full p-2 border border-gray-300 rounded-lg mb-2"
                            placeholder="brand"
                        />
                         <input
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleChange}
                            className="block w-full p-2 border border-gray-300 rounded-lg mb-2"
                            placeholder="name"
                        />
                        <button
                            onClick={createProduct}
                            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Add Product
                        </button>
                    </div>
                )}
            </div>

            {isEditing && currentProduct && (
                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>

                    {/* Product Name */}
                    <input
                        type="text"
                        name="name"
                        value={currentProduct.name}
                        onChange={(e) =>
                            setCurrentProduct({ ...currentProduct, name: e.target.value })
                        }
                        className="block w-full p-2 border border-gray-300 rounded-lg mb-2"
                        placeholder="Product Name"
                    />

                    {/* Product Description */}
                    <textarea
                        name="description"
                        value={currentProduct.description}
                        onChange={(e) =>
                            setCurrentProduct({ ...currentProduct, description: e.target.value })
                        }
                        className="block w-full p-2 border border-gray-300 rounded-lg mb-2"
                        placeholder="Product Description"
                    />

                    {/* Product Price */}
                    <input
                        type="number"
                        name="price"
                        value={currentProduct.price}
                        onChange={(e) =>
                            setCurrentProduct({ ...currentProduct, price: e.target.value })
                        }
                        className="block w-full p-2 border border-gray-300 rounded-lg mb-2"
                        placeholder="Product Price"
                    />

                    {/* Product Stock */}
                    <input
                        type="number"
                        name="stock"
                        value={currentProduct.stock}
                        onChange={(e) =>
                            setCurrentProduct({ ...currentProduct, stock: e.target.value })
                        }
                        className="block w-full p-2 border border-gray-300 rounded-lg mb-2"
                        placeholder="Stock"
                    />

                    {/* Product Image URL */}
                    <input
                        type="text"
                        name="image"
                        value={currentProduct.image}
                        onChange={(e) =>
                            setCurrentProduct({ ...currentProduct, image: e.target.value })
                        }
                        className="block w-full p-2 border border-gray-300 rounded-lg mb-2"
                        placeholder="Product Image URL"
                    />

                    {/* File Upload (Optional) */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setCurrentProduct({
                                ...currentProduct,
                                imageFile: e.target.files[0], // Save the file object
                            })
                        }
                        className="block w-full p-2 border border-gray-300 rounded-lg mb-2"
                    />

                    {/* Save Button */}
                    <button
                        onClick={updateProduct}
                        className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Save Changes
                    </button>
                </div>
            )}


            {isLoading ? (
                <div className="text-center text-xl">Loading...</div>
            ) : errorMessage ? (
                <div className="text-center text-red-500">{errorMessage}</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white p-4 rounded-lg shadow-md"
                        >
                            <img
                                src={item.image}  // Assuming item.image contains just the filename
                                alt={item.name}
                                className="w-full h-48 object-cover mb-4 rounded-md"
                            />
                            <h2 className="font-semibold text-xl mb-2">{item.name}</h2>
                            <p className="text-gray-600 mb-2">{item.description}</p>
                            <p className="font-bold text-lg text-green-600 mb-2">
                                Price: ${item.price}
                            </p>
                            <p className="text-yellow-500 mb-4">Rating: {item.review} ★</p>
                            <div className="flex gap-2 mb-4">
                                {item.sizes.map((size) => (
                                    <span key={size} className="px-3 py-1 bg-gray-200 rounded-full">
                                        {size}
                                    </span>
                                ))}
                            </div>
                            <p className="mb-4">In Stock: {item.stock}</p>
                            <div className="flex gap-2">
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                                    onClick={() => editProduct(item)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                    onClick={() => deleteProduct(item.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Product;
