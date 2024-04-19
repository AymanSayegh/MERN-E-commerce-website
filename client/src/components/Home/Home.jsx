import React, { useEffect, useContext } from "react";
import "./Home.scss";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import PopularProducts from "../PopularProducts/PopularProducts";
import { Context } from "../../utils/context";
import axios from "axios";

const Home = ({ isAdmin, auth }) => {
  const { products, setProducts, categories, setCategories } =
    useContext(Context);
  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getCategories = () => {
    axios
      .get("http://localhost:3002/category/getCategories")
      .then((res) => {
        const categoriesArray = res.data.categories;
        setCategories(categoriesArray);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  };

  const getProducts = () => {
    axios
      .get("http://localhost:3002/product/getPopularProducts")
      .then((res) => {
        const productsArray = res.data.products;
        setProducts(productsArray);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  };

  return (
    <div>
      <Banner auth={auth} />
      <div className="main-content">
        <div className="layout">
          {categories && <Category categories={categories} auth={auth} />}
          {products && (
            <PopularProducts
              headingText="Popular Products"
              products={products}
              isAdmin={isAdmin}
              auth={auth}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
