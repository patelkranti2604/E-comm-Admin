import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate for redirection

function Categories() {
  const [data, setData] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryInput, setNewCategoryInput] = useState("");  // State for new category input
  const [newCategoryDesc, setnewCategoryDesc] = useState("");  // State for new category input
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const API = "http://127.0.0.1:8000/admin-categories/"; // API endpoint for categories
  const accessToken = localStorage.getItem("accessToken");  // Get token from localStorage
  const navigate = useNavigate();  // Initialize the useNavigate hook

  // Function to check authentication
  const checkAuthentication = () => {
    if (!accessToken) {
      navigate("/login");  // Redirect to login if no access token
    }
  };

  // Fetch data from API
  const getAPI = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${accessToken}` }, // Pass JWT token in the header
      });
      setData(res.data);  // Assuming the response contains data under data
      console.log(res.data);  // Assuming the response contains data under data
    } catch (e) {
      setErrorMessage("Failed to fetch categories.");
      console.log("Error fetching data:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthentication(); // Check if access token exists before fetching data
    if (accessToken) {
      getAPI();  // Fetch categories if logged in
    }
  }, [accessToken, navigate]);  // Dependency on accessToken to trigger re-fetch

  // Handle adding a new category
  const handleAdd = async () => {
    if (!newCategoryInput) {
      alert("Category name is required!");
      return;
    }

    if (!accessToken) {
      alert("Please log in again.");
      return;
    }

    try {
      const res = await axios.post(
        API,
        { name: newCategoryInput , description:newCategoryDesc},  // Send new category data in the body
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass JWT token in the header
            "Content-Type": "application/json",
          },
        }
      );
      setData([...data, res.data]); // Add the new category to the local state
      setNewCategoryInput(""); // Clear input field
      alert("Category added successfully!");
    } catch (error) {
      setErrorMessage("Failed to add category.");
      console.error("Error adding category:", error);
    }
  };

  // Handle deleting a category
  const handleDelete = async (id) => {
    if (!accessToken) {
      alert("Please log in again.");
      return;
    }

    try {
      const res = await axios.delete(`${API}${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Pass JWT token in the header
          "Content-Type": "application/json",
        },
      });
      setData(data.filter((item) => item.id !== id)); // Remove from local state
      alert("Category deleted successfully!");
    } catch (error) {
      if (error.response && error.response.status === 405) {
        setErrorMessage("The DELETE method is not allowed for this endpoint.");
      } else {
        setErrorMessage("Failed to delete the category.");
      }
      console.error("Error deleting category:", error);
    }
  };

  // Handle opening the update form
  const handleUpdateClick = (category) => {
    setCurrentCategory(category);
    setNewCategoryName(category.name);
    setShowOverlay(true);
  };

  // Handle updating a category
  const handleUpdate = async () => {
    if (!newCategoryName) {
      alert("Category name is required!");
      return;
    }

    if (!accessToken) {
      alert("Please log in again.");
      return;
    }

    try {
      const res = await axios.patch(
        `${API}${currentCategory.id}/`, // Include the category ID in the URL
        { name: newCategoryName }, // Send updated data in body
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass JWT token in the header
            "Content-Type": "application/json",
          },
        }
      );
      setData(
        data.map((item) =>
          item.id === currentCategory.id ? { ...item, name: newCategoryName } : item
        )
      ); // Update locally without refetching
      setShowOverlay(false);
      alert("Category updated successfully!");
    } catch (error) {
      if (error.response && error.response.status === 405) {
        setErrorMessage("The PATCH method is not allowed for this endpoint.");
      } else {
        setErrorMessage("Failed to update the category.");
      }
      console.error("Error updating category:", error);
    }
  };

  return (
    <>
      <h1>Categories</h1>
      <div className="m-3 flex gap-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          <>
            <div>
              {/* Add Category Form */}
              <input
                type="text"
                value={newCategoryInput}
                onChange={(e) => setNewCategoryInput(e.target.value)}
                className="p-4 border-2"
                placeholder="New Category Name"
              />
                   <input
                type="text"
                value={newCategoryDesc}
                onChange={(e) => setnewCategoryDesc(e.target.value)}
                className="p-4 border-2"
                placeholder="New Category Desc"
              />
              <button
                className="p-4 bg-green-500 text-white m-4"
                onClick={handleAdd}
              >
                Add Category
              </button>
            </div>
            {data.map((item) => (
              <div key={item.id} className="border p-4 rounded-md">
                <h2 className="font-bold">{item.name}</h2>
                <button
                  className="p-3 bg-red-500 text-white m-4"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
                <button
                  className="p-3 bg-blue-500 text-white"
                  onClick={() => handleUpdateClick(item)}
                >
                  Update
                </button>
              </div>
            ))}
          </>
        )}
      </div>

      {showOverlay && (
        <div style={overlayStyles}>
          <div style={modalStyles}>
            <h2 className="font-extrabold">Update Category</h2>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="p-4 border-2"
              placeholder="New Category Name"
            />
            <button
              className="p-4 bg-black text-white m-4"
              onClick={handleUpdate}
            >
              Update Category
            </button>
            <button
              className="p-4 bg-gray-500 text-white"
              onClick={() => setShowOverlay(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const overlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyles = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
};

export default Categories;
