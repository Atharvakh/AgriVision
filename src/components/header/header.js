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
  const headerRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      setShowProfileDropdown(false); // Ensure dropdown is closed after login
    };

    checkLoginStatus();
    window.addEventListener("loginStatusChanged", checkLoginStatus);

    return () => {
      window.removeEventListener("loginStatusChanged", checkLoginStatus);
    };
  }, []);
  // Debounced search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) {
        handleSearch();
      } else {
        setSearchResults([]);
        setNoResults(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setNoResults(false);
    setSearchResults([]);

    try {
      const response = await fetch(
        `https://spring-bootagrivision-production.up.railway.app/api/v1/auth/user/search/${encodeURIComponent(
          query
        )}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("Fetched Data:", data);

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

  // Scroll behavior to fix header on top
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.pageYOffset > 100) {
          headerRef.current.classList.add("fixed");
        } else {
          headerRef.current.classList.remove("fixed");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (e) => setQuery(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleDropdown = () => setShowProfileDropdown((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove user data
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="header" ref={headerRef}>
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        {/* Search Bar */}
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

        {/* Navigation Tabs */}
        <div className="header-tabs">
          <Link to="/wishlist" className="header-link">
            <FavoriteIcon className="header-icon" />
            Wishlist
          </Link>
          <Link to="/cart" className="header-link">
            <ShoppingCartIcon className="header-icon" />
            Cart
          </Link>

          {/* Login or Profile Button */}
          {isLoggedIn ? (
            <div className="profile-wrapper">
              {/* Profile button with toggle functionality */}
              <div
                className="header-link profile-btn"
                onMouseEnter={() => setShowProfileDropdown(true)}
              >
                <AccountCircleIcon className="header-icon" />
                View Profile
              </div>

              {/* Dropdown should only be shown when showProfileDropdown is true */}
              {showProfileDropdown && (
                <div
                  className="profile-dropdown"
                  onMouseEnter={() => setShowProfileDropdown(true)} // Keeps it open when hovering
                  onMouseLeave={() => setShowProfileDropdown(false)} // Closes when leaving
                >
                  <Link to="/profile">My Profile</Link>
                  <Link to="#" onClick={handleLogout}>
                    <LogoutIcon className="header-icon" /> Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="header-link">
              <LoginIcon className="header-icon" />
              Log In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
