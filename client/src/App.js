import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Category from "./components/Category/Category";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import AppContext from "./utils/context";
import AddProduct from "./components/AddProduct/AddProduct";
import AddCategory from "./components/AddCategory/AddCategory";
import Products from "./components/Products/Products";
import EditProduct from "./components/EditProduct/EditProduct";
import Favorites from "./components/Favorites/Favorites";

function App() {
  const [auth, setAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:3002/users/authenticate", {
          headers: { Authorization: `Bearer: ${token}` },
        })
        .then((res) => {
          if (res.data.message === "User authenticated") {
            setAuth(true);
            setUserId(res.data.user.id);
            if (res.data.user.role === "a") {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          } else {
            setAuth(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      setAuth(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <AppContext>
        <Header auth={auth} isAdmin={isAdmin} userId={userId} />
        <Routes>
          <Route path="/" element={<Home isAdmin={isAdmin} auth={auth} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/category/:name"
            element={<Category isAdmin={isAdmin} />}
          />
          <Route
            path="/product/:id"
            element={<ProductDetails userId={userId} isAdmin={isAdmin} />}
          />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/addCategory" element={<AddCategory />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
          <Route path="/products" element={<Products isAdmin={isAdmin} />} />
          <Route path="/favorites" element={<Favorites userId={userId} />} />
        </Routes>
        <Newsletter />
        <Footer auth={auth} />
      </AppContext>
    </BrowserRouter>
  );
}

export default App;
