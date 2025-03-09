import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./compononets/Login";
import Home from "./compononets/Home";

function App() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setAccessToken(storedToken);
  }, []);

  return (
    <Router>
      <Routes>
        {/* If no accessToken, navigate to login; otherwise, show Home */}
        <Route path="/" element={accessToken ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setAccessToken={setAccessToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
