import React, { useState } from "react";
import "../header/header.css";
import Logo from "../../assets/images/AgriVision (8).png";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Login } from "@mui/icons-material";
import SelectDrop from "../selectDrop/selectDrop";
import { useEffect, useRef } from "react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const headerRef = useRef();

  const allOptions = [
    "Fertilizers",
    "Seeds",
    "Pesticides",
    "Tools",
    "Machinery",
  ];

  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      // Filter options based on the search query
      const filteredOptions = allOptions.filter((option) =>
        option.toLowerCase().includes(query.toLowerCase())
      );
      setDropdownOptions(filteredOptions);
    } else {
      setDropdownOptions([]);
    }
  };

  const handleOptionSelect = (option) => {
    setSearchQuery(option); // Set the input to the selected option
    setDropdownOptions([]); // Hide the dropdown
    console.log(`Selected: ${option}`);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      let position = window.pageYOffset;
      if (position > 100) headerRef.current.classList.add("fixed");
      else headerRef.current.classList.remove("fixed");
    });
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        {/* Search Bar with Dropdown */}
        <div className="header-search">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search here for product..."
              value={searchQuery}
              onChange={handleSearchInput}
            />
            <SearchIcon className="search-icon" />
          </div>
          {dropdownOptions.length > 0 && (
            <SelectDrop
              options={dropdownOptions}
              onOptionSelect={handleOptionSelect}
            />
          )}
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
