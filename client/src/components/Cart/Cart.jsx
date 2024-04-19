import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import { Context } from "../../utils/context";
import CartItem from "./CartItem/CartItem";
import Swal from "sweetalert2";

import "./Cart.scss";

const Cart = ({ userId }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const { setShowCart, cartSubTotal, setProductCountChange } =
    useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:3002/cart/getProductsInCart/${userId}`)
      .then((res) => {
        setCartItems(res.data.products);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, []);

  const handleCheckout = () => {
    axios
      .delete(`http://localhost:3002/cart/emptyTheCart/${userId}`)
      .then((res) => {
        setCartItems([]);
        navigate("/");
        Swal.fire({
          title: "Your purchase was successful!",
          html: `Your total was: $${cartSubTotal}<br>`,
          icon: "success",
        });
        setShowCart(false);
        setProductCountChange(
          (prevCount) => prevCount - res.data.itemsEmptiedCount
        );
      })
      .catch((error) => {
        console.error("Error emptying the cart:", error);
      });
  };

  if (!cartItems) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cart-panel">
      <div className="opac-layer" onClick={() => setShowCart(false)}></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span className="close-btn" onClick={() => setShowCart(false)}>
            <MdClose className="close-btn" />
            <span className="text">close</span>
          </span>
        </div>

        {!cartItems.length && (
          <div className="empty-cart">
            <BsCartX />
            <span>No products in the cart.</span>
            <button
              className="return-cta"
              onClick={() => {
                navigate("/products");
                setShowCart(false);
              }}
            >
              RETURN TO SHOP
            </button>
          </div>
        )}

        {!!cartItems.length && (
          <>
            <CartItem
              cartItems={cartItems}
              setCartItems={setCartItems}
              userId={userId}
            />
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Subtotal:</span>
                <span className="text total">${cartSubTotal}</span>
              </div>
              <div className="button">
                <button
                  className="checkout-cta"
                  onClick={() => handleCheckout()}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
