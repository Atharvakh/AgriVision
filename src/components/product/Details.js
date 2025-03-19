import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // 
import { useProductContext } from "../../context/AppContext";
import { Heart, ArrowLeft } from "lucide-react"; // 
import "./Details.css"; // Import external CSS
import Header from "../header/header";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSingleProduct, singleProduct, loading, error } =
    useProductContext();
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false); // Wishlist state

  useEffect(() => {
    getSingleProduct(id);
  }, [id, getSingleProduct]);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const toggleWishlist = () => setWishlist((prev) => !prev); // Toggle wishlist state

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
        <div className="product-container">
          {/* Back Button */}

          <h5 className="Arrow">
            <ArrowLeft size={20} onClick={() => navigate(-1)} />
          </h5>

          <div className="product-image">
            <img
              src={singleProduct?.productimage}
              alt={singleProduct?.productname || "Product"}
            />
          </div>

          <div className="product-details">
            {/* Product Header with Wishlist */}
            <div className="product-header">
              <h2 className="product-name">{singleProduct?.productname}</h2>
              <button className="wishlist-btn" onClick={toggleWishlist}>
                <Heart color={wishlist ? "green" : "black"} />
              </button>
            </div>

            <p className="product-category">
              Category: {singleProduct?.category}
            </p>
            <p className="product-company">
              Brand: {singleProduct?.productcompanyname}
            </p>
            <p className="product-price">
              Price:{" "}
              <span className="old-price">
                ₹{singleProduct?.beforediscount}
              </span>
              <span className="new-price">
                {" "}
                ₹{singleProduct?.afterdiscount}
              </span>
            </p>

            {/* Quantity Selector */}
            <div className="quantity-selector">
              <label>Quantity:</label>
              <button className="qty-button" onClick={decreaseQty}>
                -
              </button>
              <span className="qty-display">{quantity}</span>
              <button className="qty-button" onClick={increaseQty}>
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button className="add-to-cart-button">Add to Cart</button>

            {/* Product Description */}
            <p className="product-description">
              {singleProduct?.description || "No description available."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
