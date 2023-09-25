import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";

export const getProduct = createAsyncThunk(
  "eCommerceApp/product/getProduct",
  async (productId) => {
    const response = await axios.get(`/products/${productId}`);
    const data = await response.data;

    return data === undefined ? null : data;
  }
);

export const removeProduct = createAsyncThunk(
  "eCommerceApp/product/removeProduct",
  async (val, { dispatch, getState }) => {
    const { id } = getState().eCommerceApp.product;
    await axios.delete(`/products/delete/${id}`);
    return id;
  }
);

// Async thunk for creating a new product
export const createProduct = createAsyncThunk(
  "eCommerceApp/product/createProduct",
  async ({ productDTO }) => {
    try {
      const response = await axios.post("/products/create", productDTO);
      const createdProductData = response.data;
      return createdProductData;
    } catch (error) {
      // Handle errors here if needed
      throw error;
    }
  }
);

// Async thunk for updating an existing product
export const updateProduct = createAsyncThunk(
  "eCommerceApp/product/updateProduct",
  async ({ id, productDTO }) => {
    try {
      const response = await axios.put(`/products/edit/${id}`, productDTO);
      const updatedProductData = response.data;
      return updatedProductData;
    } catch (error) {
      // Handle errors here if needed
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: "eCommerceApp/product",
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          name: "",
          description: "",
          categories: [],
          images: [],
          price: 0,
          quantity: 0,
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getProduct.fulfilled]: (state, action) => action.payload,
    [createProduct.fulfilled]: (state, action) => action.payload,
    [updateProduct.fulfilled]: (state, action) => action.payload,
    [removeProduct.fulfilled]: (state, action) => null,
  },
});

export const { newProduct, resetProduct } = productSlice.actions;

export const selectProduct = ({ eCommerceApp }) => eCommerceApp.product;

export default productSlice.reducer;
