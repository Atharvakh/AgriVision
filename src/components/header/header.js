import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "../../assets/images/AgriVision (8).png";
import "../header/header.css";

const Header = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const headerRef = useRef();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(
          "https://spring-boot-agrivision-1.onrender.com/api/v1/auth/profile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          setUser(null);
          return;
        }

        if (!response.ok) throw new Error("Failed to fetch user data");

        const userData = await response.json();
        setUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      setShowProfileDropdown(false);
    };

    checkLoginStatus();
    window.addEventListener("loginStatusChanged", checkLoginStatus);

    return () => {
      window.removeEventListener("loginStatusChanged", checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        event.target.closest(".profile-btn") === null
      ) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setNoResults(false);
    setSearchResults([]);

    try {
      const response = await fetch(
        `https://spring-boot-agrivision-1.onrender.com/api/v1/auth/user/search/${encodeURIComponent(
          query
        )}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setSearchResults(data);
        navigate("/search-results", { state: { results: data, query } });
      } else {
        setNoResults(true);
        navigate("/search-results", { state: { results: [], query } });
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
      navigate("/search-results", { state: { results: [], query } });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => setQuery(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // Fetch Wishlist Count
  const fetchWishlistCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(
        "https://spring-boot-agrivision-1.onrender.com/api/v1/auth/user/wishlistCount",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch wishlist count");

      const data = await response.json();
      console.log("Wishlist API Response:", data);

      if (typeof data === "number") {
        setWishlistCount(data); // API returns a direct number
      } else if (typeof data.count === "number") {
        setWishlistCount(data.count); // API returns an object with count
      } else {
        setWishlistCount(0); // Fallback if unexpected format
      }

      console.log("Updated Wishlist Count:", data.count || data);
    } catch (error) {
      console.error("Error fetching wishlist count:", error);
      setWishlistCount(0);
    }
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      setShowProfileDropdown(false);
      if (token) {
        fetchWishlistCount();
        fetchCartCount(); // 🔹 Add this
      }
    };

    checkLoginStatus();
    window.addEventListener("loginStatusChanged", checkLoginStatus);
    window.addEventListener("wishlistUpdated", fetchWishlistCount);
    window.addEventListener("cartUpdated", fetchCartCount); // 🔹 Optional if other components update cart

    return () => {
      window.removeEventListener("loginStatusChanged", checkLoginStatus);
      window.removeEventListener("wishlistUpdated", fetchWishlistCount);
      window.removeEventListener("cartUpdated", fetchCartCount);
    };
  }, []);

  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(
        "https://spring-boot-agrivision-1.onrender.com/api/v1/auth/user/cartCount",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (typeof data === "number") {
        setCartCount(data);
      } else if (typeof data.count === "number") {
        setCartCount(data.count);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
      setCartCount(0);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    window.dispatchEvent(new Event("loginStatusChanged"));
    navigate("/login");
  };

  return (
    <header className="header" ref={headerRef}>
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        <div className="header-search">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search here for product..."
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <SearchIcon className="search-icon" onClick={handleSearch} />
          </div>
        </div>

        <div className="header-tabs">
          {isLoggedIn ? (
            <div className="profile-wrapper">
              {/* Wishlist with Badge */}
              <Link to="/wishlist" className="header-link wishlist-link">
                <div className="wishlist-icon-container">
                  <FavoriteIcon className="header-icon" />
                  {wishlistCount > 0 && (
                    <span className="wishlist-badge">{wishlistCount}</span>
                  )}
                </div>
                Wishlist
              </Link>

              <Link to="/cart" className="header-link">
                <div className="cart-icon-container">
                  <ShoppingCartIcon className="header-icon" />
                  {cartCount > 0 && (
                    <span className="cart-badge">{cartCount}</span>
                  )}
                </div>
                Cart
              </Link>
              <div
                className="header-link profile-btn"
                onClick={() => setShowProfileDropdown((prev) => !prev)}
              >
                <AccountCircleIcon className="header-icon" /> View Profile
              </div>
              {showProfileDropdown && (
                <div className="profile-dropdown" ref={dropdownRef}>
                  <Link to="/profile" state={{ user }}>
                    My Profile
                  </Link>
                  <Link to="#" onClick={handleLogout}>
                    <LogoutIcon className="header-icon" /> Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="header-link">
              <LoginIcon className="header-icon" /> Log In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
