import React, { createContext, useContext, useEffect, useState } from "react";

// Create context
const ProductContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const clearProducts = () => setProducts([]);

  // Fetch all products
  const fetchAllProducts = async () => {
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
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Fetch products by search query
  const fetchProductsByQuery = async (query) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://spring-boot-agrivision-1.onrender.com/api/v1/auth/user/search/${encodeURIComponent(
          query
        )}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single product
  const getSingleProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User is not authenticated.");
        return;
      }

      const response = await fetch(
        `https://spring-boot-agrivision-1.onrender.com/api/v1/auth/user/product/id/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSingleProduct(data);
    } catch (error) {
      console.error("Error fetching single product:", error);
    }
  };

  // Fetch all products on mount
  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        singleProduct,
        getSingleProduct,
        fetchProductsByQuery, // ✅ make this available
        fetchAllProducts,
        clearProducts,
      }}
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
