import React, { useEffect, useState } from "react";
import HomeSlider from "./slider/index";
import CatSlider from "../../components/catSlider";
import "./styles.css";
import Footer from "../../components/footer/footer";
import Product from "../../components/product";
import Axios from "../../Axios";

const home = () => {
  const [data, setData] = useState([]); // Store fetched data in state

  // Fetch the data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios().get("/user/ViewAllBooster"); // Replace with your actual API endpoint
        setData(response.data); // Set the fetched data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts
  //console.log("Rendering HomeSlider...");
  return (
    <>
      <HomeSlider />
      <CatSlider />

      <section className="homeProducts">
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-center">
            <h2 className="text-center">Products</h2>
          </div>

          <div className="d-flex">
            {/* Map through the data and render a Card for each item */}
            {data.map((item, index) => (
              <Cardboost data={item} key={index} index={index} />
            ))}

            <Product />
            <Product />
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

export default home;
