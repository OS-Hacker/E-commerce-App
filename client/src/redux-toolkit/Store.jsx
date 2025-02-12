import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import ProductSlice from "./ProductSlice";
import CartSlice from "./CartSlice";

export const Store = configureStore({
  reducer: {
    auth: authSlice,
    products: ProductSlice,
    cartData: CartSlice,
  },
});

