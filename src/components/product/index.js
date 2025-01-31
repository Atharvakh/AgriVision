import React, { useState, useEffect } from "react";
import { Heart, ShoppingCart, ArrowUpRight } from "lucide-react";
import "./style.css"; // Ensure this path is correct

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlistStates, setWishlistStates] = useState({});
  const [cartStates, setCartStates] = useState({});

  const BASE_URL =
    "https://spring-bootagrivision-production.up.railway.app/api/v1/auth";

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://spring-bootagrivision-production.up.railway.app/api/v1/auth/user/product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid">
        {[1, 2, 3, 4].map((skeleton) => (
          <div key={skeleton} className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-xl mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={fetchProducts} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          {/* Discount Badge */}
          {product.discount > 0 && (
            <div className="discount-badge">{product.discount}% OFF</div>
          )}

          {/* Wishlist Button */}
          <button className="wishlist-btn">
            <Heart className="h-5 w-5 text-gray-400 hover:text-red-500" />
          </button>

          {/* Image Wrapper */}
          <div className="img-wrapper">
            <img
              src={product.productimage}
              alt={product.productname}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="info">
            <h3 className="title">{product.productname}</h3>
            <p className="brand">{product.productcompanyname}</p>

            <div className="price-container">
              <span className="current-price">₹{product.afterdiscount}</span>
              {product.beforediscount && (
                <span className="original-price">
                  ₹{product.beforediscount}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="add-to-cart-btn">Add to Cart</button>
            <button className="view-details-btn">
              <ArrowUpRight />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
