import { useReducer } from "react";

function cartReducer(state, action) {
  switch (action.type) {

    case "ADD_TO_CART": {
      const existingItem = state.find((item) => item.id === action.product.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + action.quantity }
            : item
        );
      }
      return [...state, { ...action.product, quantity: action.quantity }];
    }

    case "REMOVE_FROM_CART": {
      return state.filter((item) => item.id !== action.id);
    }

    case "UPDATE_QUANTITY": {
      if (action.newQuantity <= 0) {
        return state.filter((item) => item.id !== action.id);
      }
      return state.map((item) =>
        item.id === action.id
          ? { ...item, quantity: action.newQuantity }
          : item
      );
    }

    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export function useCart() {
  const [items, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product, quantity) => {
    dispatch({ type: "ADD_TO_CART", product, quantity });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  };

  const updateQuantity = (id, newQuantity) => {
    dispatch({ type: "UPDATE_QUANTITY", id, newQuantity });
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return { items, addToCart, removeFromCart, updateQuantity, totalItems };
}