import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Login } from "@mui/icons-material";
import Logo from "../../assets/images/AgriVision (8).png";
import "../header/header.css";

const Header = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const headerRef = useRef();
  const navigate = useNavigate();

  // Debounced search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) {
        handleSearch();
      } else {
        setSearchResults([]);
        setNoResults(false);
      }
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // API Call to Fetch Search Results
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

  // Handle Input Change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle Search on Enter Key Press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
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
              onKeyDown={handleKeyDown} // Fixed deprecated onKeyPress
            />
            <SearchIcon className="search-icon" onClick={handleSearch} />
          </div>
        </div>

        {/* Search Results Dropdown */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            noResults ? "h-0" : "h-auto"
          }`}
          style={{ display: noResults ? "none" : "block" }}
        >
          {loading && <p>Loading...</p>}

          {noResults && !loading && <p>No results found</p>}
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
          <Link to="/login" className="header-link">
            <Login className="header-icon" />
            Log In
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
