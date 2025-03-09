import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setAccessToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const API = "http://127.0.0.1:8000/login/";
      const res = await axios.post(API, { username, password });

      console.log("API Response:", res.data);

      const access = res.data?.data?.token?.access || res.data?.access;
      const refresh = res.data?.data?.token?.refresh || res.data?.refresh;

      if (!access || !refresh) {
        throw new Error("Invalid response: Missing tokens");
      }

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      setAccessToken(access); // Update state to trigger re-render

      setMessage("Login successful!");
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Login Error:", error);
      setMessage("Something went wrong...");
    }
  };

  return (
    <div>
      <h2>JWT Authentication</h2>
      <form>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
