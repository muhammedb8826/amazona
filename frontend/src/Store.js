import { createContext, useReducer } from 'react';
export const Store = createContext();

const initialState = {
  cart: {
    cartItems: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      //add to cart

      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: { ...state.cart, cartItems } };
    default:
      return state;
  }
}

export default function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
}
