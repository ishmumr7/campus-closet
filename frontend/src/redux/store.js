import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";

const Store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    events: eventReducer,
  },
});

export default Store;
