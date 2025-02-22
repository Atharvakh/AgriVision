import React, { useState, useEffect } from "react";
import styles from "../../pages/Home/styles.css"; // Ensure correct CSS import
import HomeSlider from "./slider/index";
import CatSlider from "../../components/catSlider";
import Product from "../../components/product/index";
import Footer from "../../components/footer/footer";
import { useProductContext } from "../../context/AppContext"; //

const Home = () => {
  const { products } = useProductContext();
  const [selectedCategory, setSelectedCategory] = useState(null);

  console.log("Selected Category:", selectedCategory);
  console.log("Products from context:", products);

  const normalizeCategory = (category) => {
    if (!category) return "";
    return category
      .toLowerCase()
      .trim()
      .replace("bio-fertlizer", "bio-fertilizer"); // Fix typo
  };

  const filteredProducts =
    selectedCategory && selectedCategory !== "all"
      ? products.filter(
          (product) => normalizeCategory(product.category) === selectedCategory
        )
      : products;

  useEffect(() => {
    console.log("Filtered Products:", filteredProducts);
  }, [selectedCategory]);

  return (
    <>
      <HomeSlider />
      <CatSlider setSelectedCategory={setSelectedCategory} />
      <Product data={selectedCategory ? filteredProducts : products} />

      <section className="newsLetterSection">
        <div className="container-fluid">
          <div className="box d-flex flex-column align-items-center text-center">
            <div className="info">
              <h2>Stay Home and Get Weekly Farming-Related Information</h2>
            </div>
            <form className="newsletter-form mt-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="form-control mb-2"
                aria-label="Email address"
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
