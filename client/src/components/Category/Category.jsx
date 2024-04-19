import React from "react";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../utils/context";
import ProductsInCategory from "./ProductsInCategory/ProductsInCategory";
import "./Category.scss";
import axios from "axios";

const Category = ({ isAdmin }) => {
  const { name } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const { selectedSort } = useContext(Context);

  useEffect(() => {
    axios
      .get("http://localhost:3002/product/getProductsByCategory", {
        params: {
          categoryName: name,
          selectedSort: selectedSort,
        },
      })
      .then((res) => {
        const categoriesArray = res.data.products;
        setCategoryProducts(categoriesArray);
      })
      .catch((error) => {
        console.error("Error fetching category products:", error);
      });
  }, [name, selectedSort]);

  return (
    <div className="category-container">
      <h2>{name}</h2>
      <ProductsInCategory products={categoryProducts} isAdmin={isAdmin} />
    </div>
  );
};

export default Category;
