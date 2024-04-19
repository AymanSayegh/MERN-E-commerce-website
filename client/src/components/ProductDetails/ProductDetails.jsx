import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../../utils/context";
import axios from "axios";
import { FaCartPlus } from "react-icons/fa";
import ReactImageMagnify from "react-image-magnify";
import Swal from "sweetalert2";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./ProductDetails.scss";

const ProductDetails = ({ userId, isAdmin }) => {
  const { setProductCountChange } = useContext(Context);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const navigate = useNavigate();

  // product logic
  useEffect(() => {
    axios
      .get(`http://localhost:3002/product/getProductById/${id}`)
      .then((res) => {
        const product = res.data.product;
        setProductDetails(product);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  const decrement = () => {
    setQuantity((prevState) => {
      if (prevState === 1) return 1;
      return prevState - 1;
    });
  };

  const increment = (productQuantity) => {
    setQuantity((prevState) => {
      if (prevState < productQuantity) {
        return prevState + 1;
      }
      return prevState;
    });
  };

  const handleAddToCart = () => {
    if (productDetails.quantity >= 1) {
      axios
        .post("http://localhost:3002/cart/addToCart", {
          productId: productDetails._id,
          quantity: quantity,
          userId: userId,
        })
        .then((res) => {
          if (res.data.message === "Product added to cart successfully") {
            Swal.fire("Product added to cart successfully!", "", "success");
            setProductCountChange((prevCount) => prevCount + 1);
          } else if (
            res.data.message === "Product already exists in the cart"
          ) {
            Swal.fire("Product already exists in the cart!", "", "error");
          }
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
        });
    } else {
      Swal.fire("Product is out of stock!", "", "error");
    }
  };

  const handleToggleFavorites = () => {
    if (addedToFavorites) {
      Swal.fire("Product removed from favorites!", "", "success");
    } else {
      Swal.fire("Product added to favorites!", "", "success");
    }
    axios
      .post("http://localhost:3002/favorite/toggleFavorite", {
        productId: productDetails._id,
        userId,
      })
      .then((res) => {
        // Use the callback form of setAddedToFavorites to ensure the state is updated correctly
        setAddedToFavorites((prevAdded) => !prevAdded);

        // Log the message from the server
        console.log(res.data.message);
      })
      .catch((error) => {
        console.error("Error toggling favorites:", error);
      });
  };

  // to check if the user has added this product to his favorites
  useEffect(() => {
    if (userId && productDetails) {
      axios
        .post("http://localhost:3002/favorite/checkFavorite", {
          productId: productDetails._id,
          userId: userId,
        })
        .then((res) => {
          console.log(res.data);
          setAddedToFavorites(res.data.isFavorite);
        })
        .catch((error) => {
          console.error("Error checking favorites:", error);
        });
    }
  }, [userId, productDetails]);

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: productDetails.name,
                  isFluidWidth: true,
                  src: productDetails.image,
                },
                largeImage: {
                  src: productDetails.image,
                  width: 1600,
                  height: 1600,
                },
              }}
            />
          </div>
          <div className="right">
            <span className="name">{productDetails.name}</span>
            <span className="price">${productDetails.price}</span>
            <span className="desc">{productDetails.description}</span>
            {productDetails.quantity >= 1 ? (
              <span className="stock">In Stock: {productDetails.quantity}</span>
            ) : (
              <span className="out-of-stock">Out of Stock!</span>
            )}

            <div className="cart-buttons">
              <div className="quantity-buttons">
                <span onClick={decrement}>-</span>
                <span>{quantity}</span>
                <span onClick={() => increment(productDetails.quantity)}>
                  +
                </span>
              </div>
              <button
                className="add-to-cart-button"
                onClick={() => {
                  handleAddToCart();
                }}
              >
                <FaCartPlus size={20} />
                ADD TO CART
              </button>
            </div>

            <span className="divider" />
            <div className="info-item">
              <span className="text-bold">
                Category:{" "}
                <span
                  onClick={() =>
                    navigate(`/category/${productDetails.category}`)
                  }
                >
                  {productDetails.category}
                </span>
              </span>
              {!isAdmin &&
                (addedToFavorites ? (
                  <span className="heart" onClick={handleToggleFavorites}>
                    <FavoriteIcon style={{ color: "red" }} />
                  </span>
                ) : (
                  <span className="heart" onClick={handleToggleFavorites}>
                    <FavoriteBorderIcon style={{ color: "red" }} />
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
