import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./compononets/Login";
import Home from "./compononets/Home";
import Product from './compononets/Product'
import CategoryManager from "./compononets/Categories";
import Navbar from "./compononets/Navbar";
import UserManagement from './compononets/UserManagement'
function App() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setAccessToken(storedToken);
  }, []);

  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* If no accessToken, navigate to login; otherwise, show Home */}
        <Route path="/" element={accessToken ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setAccessToken={setAccessToken} />} />
        <Route path="/product" element={<Product setAccessToken={setAccessToken} />} />
        <Route path="/catagory" element={<CategoryManager setAccessToken={setAccessToken} />} />
        <Route path="/register" element={<UserManagement setAccessToken={setAccessToken} />} />


      </Routes>
    </Router>
  );
}

export default App;
