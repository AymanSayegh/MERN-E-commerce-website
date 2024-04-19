import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import Swal from "sweetalert2";
import Container from "@mui/material/Container";

export default function AddProduct() {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const productData = {
      name: data.get("productName"),
      description: data.get("productDescription"),
      price: parseFloat(data.get("price")),
      quantity: parseInt(data.get("quantity")),
      category: category,
      imgUrl: data.get("imageUrl"),
    };

    if (
      productData.name === "" ||
      productData.description === "" ||
      productData.price === null ||
      productData.quantity === null ||
      productData.category === "" ||
      productData.imgUrl === ""
    ) {
      Swal.fire("Please fill out all the fields!", "", "error");
      return;
    }

    // add a product by the admin
    axios
      .post("http://localhost:3002/product/addProduct", productData)
      .then(() => {
        navigate("/");
        // window.location.href = window.location.href;
        Swal.fire("Product added successfully!", "", "success");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  useEffect(() => {
    // retrieve all the categories to populate them in the "Select" for the categories in the add product menu
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
  }, []);

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
          Add Product
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="productName"
            label="Product Name"
            name="productName"
            autoComplete="productName"
            autoFocus
          />
          <TextareaAutosize
            // rowsMin={3}
            placeholder="Product Description"
            name="productDescription"
            id="productDescription"
            style={{ width: "100%", marginTop: "16px" }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="price"
            label="Price"
            type="number"
            id="price"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="quantity"
            label="Quantity"
            type="number"
            id="quantity"
          />
          <Select
            labelId="category-label"
            label="Category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
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
            label="Image URL"
            type="url"
            id="imageUrl"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Product
          </Button>
          <p sx={{ textAlign: "center", mb: 2 }}>Or</p>
          <Button
            onClick={() => navigate("/addCategory")}
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            Add Category
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
