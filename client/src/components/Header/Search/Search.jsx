import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Search.scss";

const Search = ({ setSearchModal }) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (!query.length) {
      setData(null);
    }

    axios
      .get("http://localhost:3002/product/searchProducts", {
        params: {
          populate: "*",
          filters: { name: { $contains: query } },
        },
      })
      .then((res) => {
        setData(res.data.products);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, [query]);

  return (
    <div className="search-modal">
      <div className="form-field">
        <input
          autoFocus
          type="text"
          placeholder="Search for products"
          value={query}
          onChange={onChange}
        />
        <MdClose className="close-btn" onClick={() => setSearchModal(false)} />
      </div>
      <div className="search-result-content">
        {!data?.data?.length && (
          <div className="start-msg">
            Start typing to see products you are looking for.
          </div>
        )}
        <div className="search-results">
          {data?.map((product) => (
            <div
              className="search-result-item"
              key={product._id}
              onClick={() => {
                navigate("/product/" + product._id);
                setSearchModal(false);
              }}
            >
              <div className="image-container">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="prod-details">
                <span className="name">{product.name}</span>
                <span className="desc">{product.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
