import React from "react";
import Slider from "react-slick";
import fungus from "../../assets/images/fungus.jpg";
import "./style.css";

const CatSlider = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    //fade: true,
    //autoplay: true,
    //autoplayspeed: 500,
  };

  return (
    <>
      <div className="catSliderSection">
        <div className="container-fluid">
          <h2 className="hd">Our Products</h2>
          <Slider {...settings} className="cat_slider_Main">
            <div className="item">
              <div className="info">
                <img src={fungus} />
                <h3 className="cat_name">Against Fungus</h3>
              </div>
            </div>
            <div className="item">
              <div className="info">
                <img src={fungus} />
                <h3 className="cat_name">Against Pests</h3>
              </div>
            </div>
            <div className="item">
              <div className="info">
                <img src={fungus} />
                <h3 className="cat_name">Fertilizers</h3>
              </div>
            </div>
            <div className="item">
              <div className="info">
                <img src={fungus} />
                <h3 className="cat_name">Other Chemicals</h3>
              </div>
            </div>
            <div className="item">
              <div className="info">
                <img src={fungus} />
              </div>
            </div>
          </Slider>
        </div>
      </div>
      <br />
      <br />
    </>
  );
};

export default CatSlider;
