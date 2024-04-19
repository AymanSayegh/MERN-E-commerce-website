import React from "react";
import "./Footer.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLocationArrow, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import Payment from "../../images/payments.png";
const Footer = ({ auth }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.href = window.location.href;
  };

  return (
    <div className="footer">
      <div className="footer-content">
        <div className="col">
          <div className="title">About</div>
          <div className="text">
            Welcome to ElectroStore, where passion meets quality! Founded in
            2023, our journey began with a simple mission – to bring exceptional
            products to your doorstep. What sets us apart is our commitment to
            curate a diverse collection of premium goods, each handpicked for
            its craftsmanship, innovation, and style. Join us on this exciting
            venture, and let ElectroStore be your trusted destination for all
            your Electronics needs.
          </div>
        </div>
        <div className="col">
          <div className="title">Contact</div>
          <div className="c-item">
            <FaLocationArrow />
            <div className="text">Shemlan, Lebanon</div>
          </div>
          <div className="c-item">
            <FaMobileAlt />
            <div className="text">Phone: 76/790701</div>
          </div>
          <div className="c-item">
            <FaEnvelope />
            <div className="text">Email: ayman-al-sayegh@hotmail.com</div>
          </div>
        </div>
        <div className="col">
          <div className="title">Categories</div>
          <span className="text">Laptops</span>
          <span className="text">Headphones</span>
          <span className="text">Keyboards</span>
          <span className="text">Mice</span>
          <span className="text">Monitors</span>
          <span className="text">Computers</span>
        </div>
        <div className="col">
          <div className="title">Pages</div>
          <span className="text">Home</span>
          <span className="text">Products</span>
          <span className="text">Cart</span>
          <span className="text">Search</span>
          <span className="text">Login</span>
          <span className="text">Register</span>
        </div>
        {auth && (
          <div>
            <button onClick={handleLogout} className="logout-btn-mobile">
              Log out
            </button>
          </div>
        )}
      </div>
      <div className="bottom-bar">
        <div className="bottom-bar-content">
          <span className="text">
            ELECTROSTORE 2023 CREATED BY AYMAN AL SAYEGH.
          </span>
          <img src={Payment} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
