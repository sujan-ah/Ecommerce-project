import { createContext, useReducer } from "react";

const Store = createContext();

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};
function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEMS":
      const newItem = action.payload;
      const existingItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existingItem
        ? state.cart.cartItems.map((item) =>
            item._id === existingItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
      ); /* class 47 */

      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems,
        },
      };

    case "CLEAR_CART": {
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [],
        },
      };
    }

    case "CART_REMOVE_ITEMS": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems,
        },
      };
    }
    default:
      return state;
  }
}

const initialState2 = {
  wishlist: {
    wishlistItems: localStorage.getItem("wishlistItems")
      ? JSON.parse(localStorage.getItem("wishlistItems"))
      : [],
  },
};
function reducer2(state, action) {
  switch (action.type) {
    case "WISHLIST_ADD_ITEMS":
      const newItem = action.payload;
      const existingItem = state.wishlist.wishlistItems.find(
        (item) => item._id === newItem._id
      );
      const wishlistItems = existingItem
        ? state.wishlist.wishlistItems.map((item) =>
            item._id === existingItem._id ? newItem : item
          )
        : [...state.wishlist.wishlistItems, newItem];

      localStorage.setItem("cartItems", JSON.stringify(wishlistItems));

      return {
        ...state,
        wishlist: {
          ...state.wishlist,
          wishlistItems,
        },
      };
    case "WISHLIST_REMOVE_ITEMS": {
      const wishlistItems = state.wishlist.wishlistItems.filter(
        (item) => item._id !== action.payload._id
      );

      localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));

      return {
        ...state,
        wishlist: {
          ...state.wishlist,
          wishlistItems,
        },
      };
    }
    default:
      return state;
  }
}

const userInitialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};
function userreducer(state, action) {
  switch (action.type) {
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };

    case "USER_LOGOUT":
      return { ...state, userInfo: null };

    default:
      return state;
  }
}

const shippingInitialState = {
  shippingaddress: localStorage.getItem("shippingaddress")
    ? JSON.parse(localStorage.getItem("shippingaddress"))
    : {},
};
function shippingreducer(state, action) {
  switch (action.type) {
    case "SHIPPING_ADDRESS":
      return { ...state, shippingaddress: action.payload };

    default:
      return state;
  }
}

const paymentInitialState = {
  paymentMethod: localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : "",
};
function paymentreducer(state, action) {
  switch (action.type) {
    case "PAYMENT_METHOD":
      return { ...state, paymentMethod: action.payload };

    default:
      return state;
  }
}

const AdminUserInitialState = {
  AdminUserInfo: localStorage.getItem("AdminUserInfo")
    ? JSON.parse(localStorage.getItem("AdminUserInfo"))
    : null,
};
function AdminUserreducer(state, action) {
  switch (action.type) {
    case "ADMINUSER_SIGNIN":
      return { ...state, AdminUserInfo: action.payload };

    default:
      return state;
  }
}

function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [state2, dispatch2] = useReducer(reducer2, initialState2);
  const [state3, dispatch3] = useReducer(userreducer, userInitialState);
  const [state4, dispatch4] = useReducer(shippingreducer, shippingInitialState);
  const [state5, dispatch5] = useReducer(paymentreducer, paymentInitialState);
  const [AdminUserState, AdminUserDispatch] = useReducer(
    AdminUserreducer,
    AdminUserInitialState
  );

  const value = {
    state,
    dispatch,
    state2,
    dispatch2,
    state3,
    dispatch3,
    state4,
    dispatch4,
    state5,
    dispatch5,
    AdminUserState,
    AdminUserDispatch,
  };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

export { Store, StoreProvider };
