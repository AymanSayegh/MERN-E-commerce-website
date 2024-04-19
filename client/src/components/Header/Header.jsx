import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import "./Header.scss";
import Search from "./Search/Search";
import { Context } from "../../utils/context";
import Cart from "../Cart/Cart";

axios.defaults.withCredentials = true;

const Header = ({ auth, isAdmin, userId }) => {
  const { cartCount, showCart, setShowCart, setCartCount, productCountChange } =
    useContext(Context);
  const [scrolled, setScrolled] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const navigate = useNavigate();
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.href = window.location.href;
  };

  const handleShowCart = () => {
    if (auth) {
      setShowCart(true);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    if (auth) {
      axios
        .get(`http://localhost:3002/cart/getCartItemsCount/${userId}`)
        .then((res) => {
          setCartCount(res.data.itemCount);
        })
        .catch((err) => console.log(err));
    }
  }, [auth, productCountChange]);

  return (
    <>
      <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          <ul className="left">
            <li onClick={() => navigate("/")}>Home</li>
            {auth ? (
              <li onClick={() => navigate("/products")}>Products</li>
            ) : (
              <li onClick={() => navigate("/login")}>Products</li>
            )}
            <li onClick={() => navigate("/about")}>About Us</li>
            {isAdmin && (
              <li
                className="addProduct-button"
                onClick={() => navigate("/addProduct")}
              >
                Add Product
              </li>
            )}
            {auth ? (
              <li className="logout-button" onClick={handleLogout}>
                Log out
              </li>
            ) : (
              <li onClick={() => navigate("/login")}>Login</li>
            )}
          </ul>
          <div className="center" onClick={() => navigate("/")}>
            ElectroStore.
          </div>
          <div className="right">
            <TbSearch
              onClick={() => {
                if (auth) setSearchModal(true);
                else navigate("/login");
              }}
            />
            {!isAdmin && (
              <AiOutlineHeart
                onClick={() => {
                  if (auth) navigate("/favorites");
                  else navigate("/login");
                }}
              />
            )}
            <span className="cart-icon" onClick={() => handleShowCart()}>
              <CgShoppingCart />
              {auth && <span>{cartCount}</span>}
            </span>
          </div>
        </div>
      </header>
      {searchModal && <Search setSearchModal={setSearchModal} />}
      {showCart && <Cart userId={userId} />}
    </>
  );
};

export default Header;
