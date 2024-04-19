import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../utils/context";
import axios from "axios";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./ProductsInCategory.scss";

const ProductsInCategory = ({ products, innerPage, isAdmin }) => {
  const { selectedSort, setSelectedSort } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    setSelectedSort("");
  }, []);

  const handleDelete = (productId) => {
    Swal.fire({
      title: "Do you want to delete this product?",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: "Delete",
    }).then((result) => {
      if (result.isDenied) {
        axios
          .post(`http://localhost:3002/product/deleteProduct/${productId}`)
          .then((res) => {
            if (res.data.message === "Product deleted successfully") {
              Swal.fire("Deleted!", "", "success");
              navigate("/");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  const handleEdit = (productId) => {
    navigate(`/editProduct/${productId}`);
  };

  return (
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
                  </span>
                  <span className="favorites-number">{product.favorites}</span>
                </div>
                {isAdmin && (
                  <Button
                    className="delete-button"
                    onClick={() => handleDelete(product._id)}
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                  >
                    delete
                  </Button>
                )}
                {isAdmin && (
                  <Button
                    className="edit-button"
                    onClick={() => handleEdit(product._id)}
                    variant="contained"
                    // color="secondary"
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsInCategory;
