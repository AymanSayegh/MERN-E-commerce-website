import React from "react";
import { useNavigate } from "react-router-dom";

import "./Banner.scss";
import BannerImg from "../../../images/Ps5-bg.png";

const Banner = ({ auth }) => {
  const navigate = useNavigate();
  return (
    <div className="hero-banner">
      <div className="content">
        <div className="text-content">
          <h1>Offers</h1>
          <p>
            Welcome to ElectroStore, where irresistible deals await you! Explore
            our SALES section to discover a selection of top-quality products at
            unbeatable prices.
          </p>
          <div className="ctas">
            <div className="banner-cta">Read More</div>
            <div
              className="banner-cta v2"
              onClick={() => {
                if (auth) navigate("/products");
                else navigate("/login");
              }}
            >
              Shop Now
            </div>
          </div>
        </div>
        <img className="banner-img" src={BannerImg} />
      </div>
    </div>
  );
};

export default Banner;
