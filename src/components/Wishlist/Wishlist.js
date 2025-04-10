import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import ProductWish from "./productwish"; // Import the existing Product component
import "../Wishlist/Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://spring-boot-agrivision-1.onrender.com/api/v1/auth/wishlist/view",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 404) {
          // Treat 404 as empty wishlist instead of throwing error
          setWishlist([]);
          return;
        }

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setWishlist(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        setError("Failed to fetch wishlist. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }

    try {
      console.log("Removing product ID:", productId);

      // 🔹 Optimistically remove the product from UI before API call
      setWishlist((prev) => prev.filter((item) => item.id !== productId));

      const response = await fetch(
        `https://spring-boot-agrivision-1.onrender.com/api/v1/auth/user/wishlist/delete/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const textResponse = await response.text();
      console.log("Raw API Response:", textResponse);

      if (!response.ok) {
        throw new Error("Failed to remove product.");
      }

      alert(`Product removed successfully.`);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      alert(`Error: ${error.message}`);

      setWishlist((prev) => [
        ...prev,
        wishlist.find((item) => item.id === productId),
      ]);
    }
  };

  if (loading) return <p>Loading wishlist...</p>;
  if (error) return <p>{error}</p>;
  if (wishlist.length === 0)
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
          💔 Your Wishlist is empty! <br />
          <button className="back-to-shop" onClick={() => navigate("/")}>
            Go Back to Shopping
          </button>
        </h1>
      </div>
    );

  return (
    <div className="wishlist-container">
      {/* Back Navigation */}
      <div className="top-nav">
        <ArrowLeft
          size={24}
          onClick={() => navigate(-1)}
          className="back-icon"
        />
        <h2 className="wishlist-title">Your Wishlist</h2>
      </div>

      {/* Wishlist Content */}
      <ProductWish data={wishlist} removeFromWishlist={removeFromWishlist} />
    </div>
  );
};
export default Wishlist;
