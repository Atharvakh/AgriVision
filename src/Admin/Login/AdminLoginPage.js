import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../../Axios";

function LoginPage() {
  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for password
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form refresh
    setLoading(true);
    try {
      const response = await Axios().post("/admin/login", {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("tok","admin"); // Store token in localStorage
         navigate("/admin/home"); 
      } else {
        setError("Invalid username or password.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials.");
    }finally 
    {
      setLoading(false);  
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Admin Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="d-flex">Username <h6 className="text-danger">*</h6></label>
            <input
              type="text"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="d-flex">Password<h6 className="text-danger">*</h6></label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Log in"
              )}
          </button>
        </form>
        <br/>
        <p>
          Login As User?{" "}
          <Link to="/login" className="signup-link">
            User Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
