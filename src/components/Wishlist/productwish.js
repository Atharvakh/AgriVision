import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react"; // Trash icon for remove button
import "../product/style.css";

const ProductWish = ({ data = [], removeFromWishlist }) => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState({});

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

      if (response.ok) {
        setWishlist((prev) => ({
          ...prev,
          [productId]: !prev[productId],
        }));
        alert("Product added to wishlist!");
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
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
            onClick={() => navigate(`/product/${product.id}`)}
            style={{ cursor: "pointer" }}
          >
            {product.discount > 0 && (
              <div className="discount-badge">{product.discount}% OFF</div>
            )}

            {removeFromWishlist ? (
              <button
                className="wishlist-btn remove-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWishlist(product.id);
                }}
              >
                <Trash2 color="red" />
              </button>
            ) : (
              <button
                className="wishlist-btn"
                onClick={(e) => toggleWishlist(e, product.id)}
              >
                <Heart color={wishlist[product.id] ? "green" : "gray"} />
              </button>
            )}

            <div className="img-wrapper">
              <img src={product.productimage} alt={product.productname} />
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
              <button className="add-to-cart-btn">
                <ShoppingCart />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductWish;
