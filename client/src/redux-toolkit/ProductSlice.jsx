import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  products: [],
  error: null,
};

const productSlice = createSlice({
  name: "product",  
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const getProduct = createAsyncThunk("getProduct/product", async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/get-product`
  );
  return data.product;
});

export default productSlice.reducer;
