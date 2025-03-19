import React, { createContext, useContext, useEffect, useState } from "react";

// Create context
const ProductContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://spring-boot-agrivision-1.onrender.com/api/v1/auth/user/product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
      console.log("Fetched products:", data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single product
  const getSingleProduct = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Fetch auth token
      if (!token) {
        console.error("User is not authenticated. Please log in.");
        return;
      }

      const response = await fetch(
        `https://spring-boot-agrivision-1.onrender.com/api/v1/auth/user/product/id/${id}`,
        {
          method: "POST", // Change to POST
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ensure Authorization header is included
          },
          body: JSON.stringify({}), // Include empty body as required
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSingleProduct(data); // Update state with the fetched product
    } catch (error) {
      console.error("Error fetching single product:", error);
    }
  };

  // Call fetchProducts when the provider mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, singleProduct, loading, error, getSingleProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within an AppProvider");
  }
  return context;
};
