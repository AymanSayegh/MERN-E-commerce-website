import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../Favorites/Favorites.scss";

const Favorites = ({ userId, innerPage }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState();
  const [selectedSort, setSelectedSort] = useState("");

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3002/favorite/getFavoriteProducts/${userId}`, {
          params: { selectedSort },
        })
        .then((res) => {
          const productsArray = res.data.products;
          setProducts(productsArray);
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
        });
    }
  }, [userId, selectedSort]);

  return (
    <>
      <h2 className="favorites-title">Favorites</h2>
      <div className="main-content">
        <div className="layout">
          <div className="products-container">
            <div className="header-container">
              {!innerPage && <div className="sec-heading">Products</div>}
              <div className="right-section">
                <p className="sort-by">Sort by</p>
                <select
                  className="select-sort"
                  value={selectedSort}
                  onChange={handleSortChange}
                >
                  <option value="">Select</option>
                  <option value="popular">Popular</option>
                  <option value="price-high-to-low">Price, High to Low</option>
                  <option value="price-low-to-high">Price, Low to High</option>
                </select>
              </div>
            </div>
            <div className={`products ${innerPage ? "innerPage" : ""}`}>
              {products?.map((product) => (
                <div key={product._id} className="product-card">
                  <div
                    className="thumbnail-product"
                    onClick={() => navigate("/product/" + product._id)}
                  >
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div
                    className="prod-details"
                    onClick={() => navigate("/product/" + product._id)}
                  >
                    <span className="name">{product.name}</span>
                    <span className="price">${product.price}</span>
                    <br />
                    <span className="favorites">
                      <FavoriteIcon
                        className="favorites-icon"
                        style={{ color: "red", marginTop: "15px" }}
                      />
                      <span className="favorites-number">
                        {product.favorites}
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;
