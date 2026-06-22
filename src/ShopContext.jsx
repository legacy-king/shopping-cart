import { createContext, useContext } from "react";
import { useCart } from "./useCart";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
const cart = useCart();

return(
    <ShopContext value={cart}>
    {children}
    </ShopContext>
);
}
export function useShopContext() {
    return useContext(ShopContext);
}
