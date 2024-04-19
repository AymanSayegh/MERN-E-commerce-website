import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import Container from "@mui/material/Container";

export default function AddCategory() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const categoryData = {
      name: data.get("categoryName"),
      imgUrl: data.get("imageUrl"),
    };

    if (categoryData.name === "" || categoryData.imgUrl === "") {
      Swal.fire("Please fill out all the fields!", "", "error");
      return;
    }

    // add a category by the admin
    axios
      .post("http://localhost:3002/category/addCategory", categoryData)
      .then(() => {
        navigate("/");
        Swal.fire("Category added successfully!", "", "success");
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });
  };

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
          Add Category
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="categoryName"
            label="Category Name"
            name="categoryName"
            autoComplete="categoryName"
            autoFocus
          />

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
            Add Category
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
