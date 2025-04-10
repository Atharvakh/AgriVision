import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import ProductCart from "./productcart.js";
import "./cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://spring-boot-agrivision-1.onrender.com/api/v1/auth/viewAllCart",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Check for 404 and treat it as empty cart
        if (response.status === 404) {
          setCartItems([]);
          return;
        }

        if (!response.ok) throw new Error("Failed to fetch cart");

        const data = await response.json();
        setCartItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Something went wrong while loading your cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (cartItemId) => {
    const token = localStorage.getItem("token");

    if (!token) return alert("Please log in first");

    try {
      const response = await fetch(
        `https://spring-boot-agrivision-1.onrender.com/api/v1/auth/user/deleteCart/${cartItemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: cartItemId }), // body required as per spec
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        console.error("Backend error:", result);
        throw new Error(result.message || "Could not remove item");
      }

      // Update UI after successful deletion
      setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));

      alert("Item removed from cart");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to remove item.");
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in first");

    try {
      const response = await fetch(
        "https://spring-boot-agrivision-1.onrender.com/api/v1/auth/updateCartQuantity",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId, quantity: newQuantity }),
        }
      );

      const result = await response.text();

      if (!response.ok || result.success === false) {
        console.error("API Error:", result);
        throw new Error("Failed to update quantity");
      }

      // Update local state
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (err) {
      console.error("Quantity update failed:", err);
      alert("Unable to update quantity.");
    }
  };

  const proceedToBuy = (productId) => {
    navigate(`/checkout/${productId}`);
  };

  if (loading) return <p>Loading your cart...</p>;
  if (error) return <p>{error}</p>;
  if (cartItems.length === 0)
    return (
      <div>
        <h1
          style={{
            textAlign: "center",
            marginTop: "4rem",
            fontSize: "2.5rem",
            color: "#555",
            animation: "fadeIn 1s ease-in-out",
          }}
        >
          😢 Your cart is empty! <br />
          <button className="back-to-shop" onClick={() => navigate("/")}>
            Go Back to Shopping
          </button>
        </h1>
      </div>
    );
  return (
    <div className="wishlist-container">
      <div className="top-nav">
        <ArrowLeft
          size={24}
          onClick={() => navigate(-1)}
          className="back-icon"
        />
        <h2 className="wishlist-title">Your Cart</h2>
      </div>

      <ProductCart
        data={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        proceedToBuy={proceedToBuy}
      />
    </div>
  );
};

export default Cart;
