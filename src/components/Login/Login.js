import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.css";

const LoginPage = () => {
  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before new request

    try {
      const response = await fetch(
        "https://spring-boot-agrivision-1.onrender.com/api/v1/auth/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json(); // Parse the JSON response

      if (response.ok) {
        localStorage.setItem("token", data.token); // Store token in localStorage

        // Dispatch a custom event to notify other components (Header) about login
        window.dispatchEvent(new Event("loginStatusChanged"));

        navigate("/"); // Redirect to dashboard after successful login
      } else {
        setError(data.message || "Login failed. Try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary">
            Log In
          </button>
        </form>
        <br />
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
