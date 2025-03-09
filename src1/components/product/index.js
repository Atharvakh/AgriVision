import React from "react";
import Roundup from "../../assets/images/Roundup.jpg";
import "./style.css";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { FavoriteBorderOutlined } from "@mui/icons-material";

const Product = () => {
  return (
    <div className="productThumb">
      <Link to="/Details">
        <div className="imgWrapper">
          <img src={Roundup} alt="Roundup Herbicide" />
        </div>
      </Link>
      <div className="info">
        <span className="d-block catName">Herbicide</span>
        <h4 className="title">
          <Link to="/Details">Roundup Herbicide</Link>
        </h4>
        <Rating name="read-only" value={4} readOnly />
        <br />
        <span className="d-block brand">
          By{" "}
          <a className="text-g">
            <Link to="/brand/monsanto">Monsanto</Link>
          </a>
        </span>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <span className="price text-g font-weight-bold">&#8377; 50.00</span>
          </div>
          <Button className="bg-g ml-auto">
            <ShoppingCartOutlined />
            Add
          </Button>
          <Button className="bg-g ml-auto">
            <FavoriteBorderOutlined />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
