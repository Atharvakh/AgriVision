import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form refresh
    navigate("/admin/home"); // Redirect to dashboard after successful login

    // try {
    //   const response = await Axios.post("/admin/login", {
    //     username,
    //     password,
    //   });

    //   if (response.status === 200 && response.data.token) {
    //     localStorage.setItem("token", response.data.token); // Store token in localStorage    
    //   } else {
    //     setError("Invalid username or password.");
    //   }
    // } catch (error) {
    //   console.error("Login failed:", error);
    //   setError("Login failed. Please check your credentials.");
    // }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Admin Login</h2>
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
      </div>
    </div>
  );
}

export default LoginPage;
