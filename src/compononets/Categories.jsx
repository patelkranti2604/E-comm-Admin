import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Categories() {
  const [data, setData] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDesc, setNewCategoryDesc] = useState("");
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [newCategoryInputDesc, setNewCategoryInputDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const API = "http://127.0.0.1:8000/admin-categories/";
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const checkAuthentication = () => {
    if (!accessToken) {
      navigate("/login");
    }
  };

  const getAPI = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setData(res.data);
    } catch (e) {
      setErrorMessage("Failed to fetch categories.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
    if (accessToken) {
      getAPI();
    }
  }, [accessToken, navigate]);

  const handleAdd = async () => {
    if (!newCategoryInput) {
      alert("Category name is required!");
      return;
    }
    try {
      const res = await axios.post(
        API,
        { name: newCategoryInput, description: newCategoryInputDesc },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setData([...data, res.data]);
      setNewCategoryInput("");
      setNewCategoryInputDesc("");
    } catch (error) {
      setErrorMessage("Failed to add category.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      setErrorMessage("Failed to delete category.");
    }
  };

  const handleUpdateClick = (category) => {
    setCurrentCategory(category);
    setNewCategoryName(category.name);
    setNewCategoryDesc(category.description);
    setShowOverlay(true);
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        `${API}${currentCategory.id}/`,
        { name: newCategoryName, description: newCategoryDesc },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setData(
        data.map((item) =>
          item.id === currentCategory.id
            ? { ...item, name: newCategoryName, description: newCategoryDesc }
            : item
        )
      );
      setShowOverlay(false);
    } catch (error) {
      setErrorMessage("Failed to update category.");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/background.jpg')" }}>
      <div className={`container mx-auto p-6 bg-white bg-opacity-80 rounded-lg shadow-lg transition ${showOverlay ? "blur-lg" : ""}`}>
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-6">Categories</h1>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-6">
          <input
            type="text"
            value={newCategoryInput}
            onChange={(e) => setNewCategoryInput(e.target.value)}
            className="p-3 border rounded-md w-full md:w-1/3 bg-gray-100"
            placeholder="New Category Name"
          />
          <input
            type="text"
            value={newCategoryInputDesc}
            onChange={(e) => setNewCategoryInputDesc(e.target.value)}
            className="p-3 border rounded-md w-full md:w-1/3 bg-gray-100"
            placeholder="New Category Description"
          />
          <button
            className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md w-full md:w-auto hover:opacity-80"
            onClick={handleAdd}
          >
            Add Category
          </button>
        </div>
        {isLoading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <div key={item.id} className="border p-6 rounded-lg shadow-lg bg-white">
                <h2 className="text-lg font-semibold text-indigo-700">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.description}</p>
                <div className="flex gap-2 mt-4">
                  <button
                    className="p-2 bg-green-500 text-white rounded-md hover:bg-green-700"
                    onClick={() => handleUpdateClick(item)}
                  >
                    Update
                  </button>
                  <button
                    className="p-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showOverlay && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Update Category</h2>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="p-3 border rounded-md w-full mb-2"
              placeholder="Category Name"
            />
            <input
              type="text"
              value={newCategoryDesc}
              onChange={(e) => setNewCategoryDesc(e.target.value)}
              className="p-3 border rounded-md w-full mb-4"
              placeholder="Category Description"
            />
            <button className="p-3 bg-blue-500 text-white rounded-md w-full mb-2" onClick={handleUpdate}>Update</button>
            <button className="p-3 bg-gray-500 text-white rounded-md w-full" onClick={() => setShowOverlay(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
