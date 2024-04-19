import { useNavigate } from "react-router-dom";
import "./Category.scss";

const Category = ({ categories, auth }) => {
  const navigate = useNavigate();

  return (
    <div className="shop-by-category">
      <div className="sec-heading">Shop by Categories</div>
      <div className="categories">
        {categories.map((category) => (
          <div
            key={category._id}
            className="category"
            onClick={() =>
              auth ? navigate(`/category/${category.name}`) : navigate("/login")
            }
          >
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
