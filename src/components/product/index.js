import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import "./style.css";

const Product = ({ data = [] }) => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState({}); // Track wishlist state per product

  // Ensure data is always an array
  if (!Array.isArray(data)) {
    console.error("Expected an array, but received:", data);
    return <p>Error: Products could not be loaded.</p>;
  }

  if (data.length === 0) {
    return <p>No products found for this category.</p>;
  }

  const toggleWishlist = async (e, productId) => {
    e.stopPropagation(); // Prevent navigation trigger

    const token = localStorage.getItem("token")?.trim();
    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        "https://spring-boot-agrivision-1.onrender.com/api/v1/auth/wishlist/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId }),
        }
      );

      console.log("Response Status:", response.status);
      const contentType = response.headers.get("content-type");

      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text(); // Handle non-JSON responses
        console.warn("Non-JSON response received:", data);
      }

      console.log("Response Data:", data);

      if (response.ok) {
        setWishlist((prev) => ({
          ...prev,
          [productId]: !prev[productId],
        }));
        alert(data.message || "Product added to wishlist!");
      } else {
        alert(data.message || data || `Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      alert("Something went wrong.");
    }
  };

  const addToCart = async (e, product) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        "https://spring-boot-agrivision-1.onrender.com/api/v1/auth/addToCart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.trim()}`,
          },
          body: JSON.stringify({ productId: product.id }), // ✅ FIXED
        }
      );

      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (response.ok) {
        alert(data.message || data || "Product added to cart!");
      } else {
        alert(data.message || data || "Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="show-parent">
      <div className="show">
        {data.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => navigate(`/product/${product.id}`)} // Make entire card clickable
            style={{ cursor: "pointer" }}
          >
            {product.discount > 0 && (
              <div className="discount-badge">{product.discount}% OFF</div>
            )}

            <button
              className="wishlist-btn"
              onClick={(e) => toggleWishlist(e, product.id)}
            >
              <Heart color={wishlist[product.id] ? "green" : "gray"} />
            </button>

            <div className="img-wrapper">
              <img
                src={product.productimage}
                alt={product.productname}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="info">
              <h3 className="title">{product.productname}</h3>
              <p className="brand">{product.productcompanyname}</p>

              <div className="price-container">
                <span className="current-price">₹{product.afterdiscount}</span>
                {product.beforediscount > product.afterdiscount && (
                  <span className="original-price">
                    ₹{product.beforediscount}
                  </span>
                )}
              </div>
            </div>

            <div className="action-buttons">
              <button
                className="add-to-cart-btn"
                onClick={(e) => addToCart(e, product, 1)}
              >
                <ShoppingCart />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
