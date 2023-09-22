import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  cartItems: [],
  status: "idle",
  error: null,
};

// Create an async thunk for fetching cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    try {
      const response = await axios.get(`/ordered_products/all/${userId}`);
      return response.data; // Assuming the response contains the cart items
    } catch (error) {
      throw error;
    }
  }
);

// Create an async thunk for removing an item from the cart
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async ({ productId, userId }) => {
    try {
      await axios.delete(`/ordered_products/remove/${productId}/${userId}`);
      return productId;
    } catch (error) {
      throw error;
    }
  }
);

// Create a cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch cart items reducers
    builder.addCase(fetchCartItems.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.cartItems = action.payload;
    });
    builder.addCase(fetchCartItems.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // Remove cart item reducers
    builder.addCase(removeCartItem.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(removeCartItem.fulfilled, (state, action) => {
      state.status = "succeeded";
      // Filter out the removed item by productId
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    });
    builder.addCase(removeCartItem.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default cartSlice.reducer;

// Export selectors for accessing cart state
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartError = (state) => state.cart.error;
