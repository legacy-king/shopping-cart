import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { ShopProvider } from "./ShopContext";

function App() {
  return (
    <ShopProvider>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </ShopProvider>
  );
}

export default App;