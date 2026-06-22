import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { useCart } from "./useCart";

function App() {
  const { items, addToCart, updateQuantity, removeFromCart, totalItems } = useCart();

  return (
    <div>
      <Navbar cartCount={totalItems} />
      <Outlet context={{ items, addToCart, updateQuantity, removeFromCart }} />
    </div>
  );
}

export default App;