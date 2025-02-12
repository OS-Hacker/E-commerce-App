import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const saveToLocalStorage = (state) => {
  localStorage.setItem("cartProduct", JSON.stringify(state.cartProduct));
};

export const cartSlice = createSlice({
  name: "cartData",
  initialState: {
    cartProduct: JSON.parse(localStorage.getItem("cartProduct")) || [],
    TotalQuntaity: null,
    TotalPrice: null,
  },

  reducers: {
    addToCart: (state, action) => {
      let find = state.cartProduct.findIndex(
        (item) => item._id === action.payload._id
      );
      if (find >= 0) {
        state.cartProduct[find].quantity += 1;
        toast.info("Increased product quantity", {
          position: "bottom-left",
        });
      } else {
        const tempQuntity = { ...action.payload, quantity: 1 };
        state.cartProduct.push(tempQuntity);

        toast.success(`${action.payload.name} added to cart`, {
          position: "bottom-left",
        });
      }
      saveToLocalStorage(state); // Save to localStorage
    },

    getCartTotal(state) {
      let { TotalQuntaity, totalPrice } = state.cartProduct.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;
          cartTotal.totalPrice += itemTotal;
          cartTotal.TotalQuntaity += quantity;
          return cartTotal;
        },
        { totalPrice: 0, TotalQuntaity: 0 }
      );
      state.TotalPrice = parseInt(totalPrice.toFixed(2));
      state.TotalQuntaity = TotalQuntaity;
    },

    decreaseCart(state, action) {
      const itemIndex = state.cartProduct.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cartProduct[itemIndex].quantity > 1) {
        state.cartProduct[itemIndex].quantity -= 1;

        toast.info("Decreased product quantity", {
          position: "bottom-left",
        });
      } else if (state.cartProduct[itemIndex].quantity === 1) {
        const nextcartProduct = state.cartProduct.filter(
          (item) => item._id !== action.payload._id
        );

        state.cartProduct = nextcartProduct;

        toast.error("Product removed from cart", {
          position: "bottom-left",
        });
      }
      saveToLocalStorage(state); // Save to localStorage
    },

    removeItem: (state, action) => {
      state.cartProduct = state.cartProduct.filter(
        (item) => item._id !== action.payload
      );

      toast.error("product removed", {
        position: "bottom-left",
      });
      saveToLocalStorage(state); // Save to localStorage
    },
  },
});

export const { addToCart, getCartTotal, decreaseCart, removeItem } =
  cartSlice.actions;

export default cartSlice.reducer;
