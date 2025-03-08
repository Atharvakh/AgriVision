import React from "react";
import CatSlider from "../../components/catSlider";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import Product from "../../components/product/index";
import HomeSlider from "./slider/index";
import styles from "./styles.css";

const Home = () => {
  return (
    <>
    <Header />
      <HomeSlider />
      <CatSlider />

      <section className={styles.homeProducts}>
        <div className={styles.container}>
          <h2 className={styles.textCenter}>Products</h2>
          <div className={styles.productGrid}>
            <Product />
          </div>
        </div>
      </section>

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
