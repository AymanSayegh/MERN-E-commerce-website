import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Context } from "../../../utils/context";
import { MdClose } from "react-icons/md";
import "./CartItem.scss";

const CartItem = ({ cartItems, setCartItems, userId }) => {
  const { setCartSubTotal, setProductCountChange } = useContext(Context);
  // Separate state variable to trigger recalculation
  const [updateSubTotal, setUpdateSubTotal] = useState(0);

  const handleCartProductQuantity = (type, product) => {
    if (type === "dec") {
      if (product.cartQuantity > 1) {
        // Decrease cartQuantity only if it's greater than 1
        product.cartQuantity--;
      }
    } else if (type === "inc") {
      if (product.cartQuantity < product.quantity) {
        // Increase cartQuantity only if it's less than the original quantity
        product.cartQuantity++;
      }
    }

    // update the quantity of the cart item in the cart_items table
    axios
      .put(
        `http://localhost:3002/cart/updateCartProductQuantity/${product._id}`,
        {
          newQuantity: product.cartQuantity,
          userId: userId,
        }
      )
      .then((res) => {
        console.log("Quantity updated successfully");
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
      });

    // Trigger recalculation by updating updateSubTotal state
    setUpdateSubTotal(updateSubTotal + 1);
  };

  // remove a specific product from the cart
  const handleRemoveFromCart = (product) => {
    // Remove the cart item from the cart_items table
    axios
      .delete(`http://localhost:3002/cart/removeFromCart/${product._id}`, {
        data: { userId: userId },
      })
      .then((res) => {
        setProductCountChange((prevCount) => prevCount - 1);
        console.log("Item removed from cart successfully");

        // Update the client-side state (remove the item from cartItems)
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item._id !== product._id)
        );
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);
      });

    // Trigger recalculation by updating updateSubTotal state
    setUpdateSubTotal(updateSubTotal + 1);
  };

  // useEffect to recalculate subtotal when updateSubTotal changes
  useEffect(() => {
    const subtotal = cartItems.reduce(
      (total, cartProduct) =>
        total + cartProduct.price * cartProduct.cartQuantity,
      0
    );
    setCartSubTotal(subtotal);
  }, [cartItems, updateSubTotal, setCartSubTotal]);

  return (
    <div className="cart-products">
      {cartItems?.map((product) => (
        <div
          className="search-result-item"
          key={product._id}
          onClick={() => {}}
        >
          <div className="image-container">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="prod-details">
            <span className="name">{product.name}</span>
            <MdClose
              className="close-btn"
              onClick={() => handleRemoveFromCart(product)}
            />
            <div className="quantity-buttons">
              <span onClick={() => handleCartProductQuantity("dec", product)}>
                -
              </span>
              <span>{product.cartQuantity}</span>
              <span onClick={() => handleCartProductQuantity("inc", product)}>
                +
              </span>
            </div>
            <div className="text">
              <span>{product.cartQuantity}</span>
              <span>x</span>
              <span className="highlight">
                <span>$</span>
                {product.price * product.cartQuantity}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
