import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Home from "./pages/Home/index";
import LoginPage from "./components/Login/Login";
import SignUpPage from "./components/Login/Register";
import Details from "./components/product/Details";
import AboutUs from "./components/aboutUs/about";
import Contact from "./components/contact/contact";
import Product from "./components/product/index";
import SearchResults from "./pages/searchResult";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="Details" element={<Details />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/search-results" element={<SearchResults />} />
      </Routes>
    </>
  );
};

export default App;
