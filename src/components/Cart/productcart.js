import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus } from "lucide-react";
import "./productcart.css";

const ProductCart = ({
  data = [],
  removeFromCart,
  updateQuantity,
  proceedToBuy,
}) => {
  const navigate = useNavigate();

  if (!Array.isArray(data)) {
    console.error("Expected an array, but received:", data);
    return <p>Error: Products could not be loaded.</p>;
  }

  if (data.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="show-parent">
      <div className="show">
        {data.map((product) => (
          <div
            key={product.product.id}
            className="product-card"
            onClick={() => navigate(`/product/${product.product.id}`)}
            style={{ cursor: "pointer" }}
          >
            {product.product.discount > 0 && (
              <div className="discount-badge">
                {product.product.discount}% OFF
              </div>
            )}

            <button
              className="remove-btn"
              onClick={(e) => {
                e.stopPropagation();
                removeFromCart(product.id);
                console.log(product.id);
              }}
            >
              <Trash2 color="red" />
            </button>

            <div className="img-wrapper">
              <img
                src={product.product.productimage}
                alt={product.product.productname}
              />
            </div>

            <div className="info">
              <h3 className="title">{product.product.productname}</h3>
              <p className="brand">{product.product.productcompanyname}</p>

              <div className="price-container">
                <span className="current-price">
                  ₹{product.product.afterdiscount}
                </span>
                {product.product.beforediscount >
                  product.product.afterdiscount && (
                  <span className="original-price">
                    ₹{product.product.beforediscount}
                  </span>
                )}
              </div>

              {/* Quantity Controller */}
              <div className="quantity-controller">
                <button
                  className="qty"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (product.quantity > 1) {
                      updateQuantity(product.product.id, product.quantity - 1);
                    }
                  }}
                >
                  <Minus />
                </button>
                <span>{product.quantity}</span>
                <button
                  className="qty"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQuantity(product.product.id, product.quantity + 1);
                  }}
                >
                  <Plus />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCart;
