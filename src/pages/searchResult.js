import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useProductContext } from "../context/AppContext.js";
import { useNavigate } from "react-router-dom";
import Product from "../components/product/index.js";
import styles from "../pages/searchResult.css";
import { ArrowLeft } from "lucide-react";
import Header from "../components/header/header.js";

const SearchResults = () => {
  const location = useLocation();
  const query = location.state?.query || "";
  const { fetchProductsByQuery, products, loading, error } =
    useProductContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (query) {
      fetchProductsByQuery(query);
    }
  }, [query]);

  return (
    <>
      <Header />
      <section className={styles.homeProducts}>
        <div className={styles.container}>
          <ArrowLeft size={24} onClick={() => navigate(-1)} />
          <h2 className={styles.textCenter}>Search Results for: "{query}"</h2>

          <div className={styles.productGrid}>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && products.length === 0 && (
              <p>No products found.</p>
            )}
            {!loading && !error && products.length > 0 && (
              <Product data={products} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchResults;
