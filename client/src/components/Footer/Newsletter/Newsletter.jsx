import React, { useState } from "react";
import axios from "axios";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Swal from "sweetalert2";
import "./Newsletter.scss";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email === "") {
      Swal.fire("Please fill a valid email address!", "", "error");
    } else {
      // add the email to the subscription table and send an email to the subscribed user
      axios
        .post("http://localhost:3002/subscription/subscribe", {
          email,
        })
        .then((response) => {
          if (response.data.message === "Email added successfully") {
            Swal.fire({
              title: "Thank you for subscribing!",
              html: `Please check your email`,
              icon: "success",
            });
            setEmail("");
          } else if (response.data.message === "Email already exists") {
            Swal.fire("Already subscribed using this email!", "", "error");
            setEmail("");
          } else if (response.data.message === "Invalid email address") {
            Swal.fire("Please fill a valid email address!", "", "error");
            setEmail("");
          } else {
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error during subscription:", error);
        });
    }
  };

  return (
    <div className="newsletter-section">
      <div className="newsletter-content">
        <span className="small-text">Newsletter</span>
        <span className="big-text">Sign up for latest updates and offers</span>
        <div className="form">
          <input
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSubscribe}>Subscribe</button>
        </div>
        <span className="text">
          Will be used in accordance with our Privacy Policy
        </span>
        <span className="social-icons">
          <div className="icon">
            <FaLinkedinIn size={14} />
          </div>
          <div className="icon">
            <FaFacebookF size={14} />
          </div>
          <div className="icon">
            <FaTwitter size={14} />
          </div>
          <div className="icon">
            <FaInstagram size={14} />
          </div>
        </span>
      </div>
    </div>
  );
};

export default Newsletter;
