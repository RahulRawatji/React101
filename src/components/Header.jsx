import logoImg from "../assets/logo.jpg";
import CartContext from "../store/CartContext";
import UserProgressContext from '../store/UserProgressContext';
import Button from "./UI/Button";
import { useContext } from "react";

function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  function handleShowCart(){
    userProgressCtx.showCart();
  }

  const totalCartItems = cartCtx.items?.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A Restarant" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart} textOnly>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}

export default Header;
