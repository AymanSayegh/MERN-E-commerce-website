import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./PopularProducts.scss";

const PopularProducts = ({
  products,
  innerPage,
  headingText,
  isAdmin,
  auth,
}) => {
  const navigate = useNavigate();

  // const handleDelete = (productId) => {
  //   Swal.fire({
  //     title: "Do you want to delete this product?",
  //     icon: "question",
  //     showDenyButton: true,
  //     showCancelButton: true,
  //     showConfirmButton: false,
  //     denyButtonText: "Delete",
  //   }).then((result) => {
  //     if (result.isDenied) {
  //       axios
  //         .post(`http://localhost:3002/product/deleteProduct/${productId}`)
  //         .then((res) => {
  //           if (res.data.message === "Product deleted successfully") {
  //             Swal.fire("Deleted!", "", "success");
  //             navigate("/");
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   });
  // };

  // const handleEdit = (productId) => {
  //   navigate(`/editProduct/${productId}`);
  // };

  return (
    <div className="products-container">
      {!innerPage && <div className="sec-heading">{headingText}</div>}
      <div className={`products ${innerPage ? "innerPage" : ""}`}>
        {products?.map((product) => (
          <div key={product._id} className="product-card">
            <div
              className="thumbnail"
              onClick={() =>
                auth ? navigate("/product/" + product._id) : navigate("/login")
              }
            >
              <img src={product.image} alt={product.name} />
            </div>
            <div
              className="prod-details"
              onClick={() =>
                auth ? navigate("/product/" + product._id) : navigate("/login")
              }
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
            {/* {isAdmin && (
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
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
