import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductContext } from "../../context/AppContext";
import { Heart, ArrowLeft } from "lucide-react";
import "./Details.css";
import Header from "../header/header";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSingleProduct, singleProduct, loading, error } =
    useProductContext();
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState(null);

  useEffect(() => {
    getSingleProduct(id);
  }, [id, getSingleProduct]);

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(
        `https://spring-boot-agrivision-1.onrender.com/api/v1/auth/user/commentview/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch comments");
      const data = await response.json();
      setComments(data);
      setCommentError(null);
    } catch (error) {
      setCommentError("Error loading comments.");
      console.error("Error fetching comments:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const toggleWishlist = async () => {
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
          body: JSON.stringify({ productId: id }), // Use product ID from route params
        }
      );

      console.log("Wishlist Response Status:", response.status);
      const contentType = response.headers.get("content-type");

      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
        console.warn("Non-JSON response received:", data);
      }

      console.log("Wishlist Response Data:", data);

      if (response.ok) {
        setWishlist(true); // Update state to reflect change
        alert(data.message || "Product added to wishlist!");
      } else {
        alert(data.message || data || `Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      alert("Something went wrong.");
    }
  };

  if (loading) return <p className="product-info">Loading...</p>;
  if (error)
    return (
      <p className="product-info error">
        {error.message || "An error occurred."}
      </p>
    );

  if (!singleProduct) return <p className="product-info">No product found.</p>;

  return (
    <>
      <Header />
      <div className="details-page">
        <div className="top-nav">
          <ArrowLeft
            size={24}
            onClick={() => navigate(-1)}
            className="back-icon"
          />
        </div>

        <div className="product-main">
          <div className="product-image">
            <img
              src={singleProduct?.productimage}
              alt={singleProduct?.productname || "Product"}
            />
            <button className="wishlist-btn" onClick={toggleWishlist}>
              <Heart color={wishlist ? "green" : "gray"} />
            </button>
          </div>

          <div className="product-details">
            <div className="product-header">
              <h2 className="product-name">{singleProduct?.productname}</h2>
            </div>

            <p className="product-category">
              Category: {singleProduct?.category}
            </p>
            <p className="product-company">
              Brand: {singleProduct?.productcompanyname}
            </p>
            <p className="product-price">
              <span className="old-price">
                ₹{singleProduct?.beforediscount}
              </span>
              <span className="new-price">
                {" "}
                ₹{singleProduct?.afterdiscount}
              </span>
            </p>

            <div className="quantity-selector">
              <label>Quantity: </label>
              <button className="qty-button" onClick={decreaseQty}>
                -
              </button>
              <span className="qty-display">{quantity}</span>
              <button className="qty-button" onClick={increaseQty}>
                +
              </button>
            </div>

            <button className="add-to-cart-button">Add to Cart</button>
            <p className="product-description">
              {singleProduct?.description || "No description available."}
            </p>
          </div>
        </div>

        <div className="reviews-section">
          <h3>Customer Reviews</h3>
          {commentError && <p className="comment-error">{commentError}</p>}
          {comments.length === 0 ? (
            <p>No comments available.</p>
          ) : (
            <div className="comments-list">
              {comments.map((comment, index) => (
                <div key={index} className="comment">
                  <strong>{comment.Uname}</strong> - ⭐{comment.star}
                  <p>{comment.message}</p>
                  {comment.image && (
                    <img
                      src={comment.image}
                      alt="User Upload"
                      className="comment-media"
                    />
                  )}
                  {comment.video && (
                    <video
                      src={comment.video}
                      controls
                      className="comment-media"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="add-comment-form">
          <h3>Add a Review</h3>
          <form>
            <label>Rating:</label>
            <input type="number" min="1" max="5" required />

            <label>Comment:</label>
            <textarea required></textarea>

            <label>Image:</label>
            <input type="file" accept="image/*" />

            <label>Video:</label>
            <input type="file" accept="video/*" />

            <button type="submit">Submit Review</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Details;
