import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart:()=>{}
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const expectedCartItemIndex = state.items.findIndex(
      (item) => item.id == action.item.id
    );

    const updatedItems = [...state.items];

    if (expectedCartItemIndex > -1) {
      const exitingItem = updatedItems[expectedCartItemIndex];
      const updatedItem = {
        ...exitingItem,
        quantity: exitingItem.quantity + 1,
      };
      updatedItems[expectedCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const expectedCartItemIndex = state.items.findIndex(
      (item) => item.id == action.id
    );
    const existingCartItem = state.items[expectedCartItemIndex];
    const updatedItems = [...state.items];
    if (expectedCartItemIndex == 1) {
      updatedItems.slice(expectedCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItem] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  if(action.type === "CLEAR_CART"){
    return {...state, items:[]}
  }
  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchAction] = useReducer(cartReducer, { items: [] });

  const cartValue = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart
  };

  function addItem(item) {
    dispatchAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchAction({ type: "REMOVE_ITEM", id });
  }

  function clearCart(){
    dispatchAction({type:"CLEAR_CART"})
  }

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
}

export default CartContext;
