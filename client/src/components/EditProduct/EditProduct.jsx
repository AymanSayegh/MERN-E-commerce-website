import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Swal from "sweetalert2";

export default function EditProduct() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState();
  const [categoryOptions, setCategoryOptions] = useState([]);

  const navigate = useNavigate();

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

    axios
      .get("http://localhost:3002/category/getCategories")
      .then((res) => {
        const categoryNames = res.data.categories.map(
          (category) => category.name
        );
        setCategoryOptions(categoryNames);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3002/product/editProduct/${id}`, productDetails)
      .then((res) => {
        if (res.data.message === "Product updated successfully") {
          console.log("Product updated successfully");
          Swal.fire("Product updated successfully!", "", "success");
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error updating product details:", error);
      });
  };

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AddBoxIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Product
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="productName"
            autoFocus
            value={productDetails.name}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                name: e.target.value,
              })
            }
          />
          <TextareaAutosize
            placeholder="Product Description"
            name="productDescription"
            id="productDescription"
            style={{ width: "100%", marginTop: "16px" }}
            value={productDetails.description}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                description: e.target.value,
              })
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="price"
            label="Price"
            type="number"
            id="price"
            value={productDetails.price}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                price: e.target.value,
              })
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="quantity"
            label="Quantity"
            type="number"
            id="quantity"
            value={productDetails.quantity}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                quantity: e.target.value,
              })
            }
          />
          <Select
            labelId="category-label"
            label="Category"
            value={productDetails.category}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                category: e.target.value,
              })
            }
          >
            <MenuItem value="" disabled>
              Select a Category
            </MenuItem>
            {categoryOptions.map((categoryName) => (
              <MenuItem key={categoryName} value={categoryName}>
                {categoryName}
              </MenuItem>
            ))}
          </Select>
          <TextField
            margin="normal"
            required
            fullWidth
            name="imageUrl"
            type="url"
            id="imageUrl"
            value={productDetails.image}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                image: e.target.value,
              })
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
