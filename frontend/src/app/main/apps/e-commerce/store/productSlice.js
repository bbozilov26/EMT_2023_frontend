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

export const saveProduct = createAsyncThunk(
  "eCommerceApp/product/saveProduct",
  async (productData, { dispatch, getState }) => {
    const { id } = getState().eCommerceApp;

    const response = await axios.put(`/products/add/${id}`, productData);

    const data = await response.data;

    return data;
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
          id: FuseUtils.generateGUID(),
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
    [saveProduct.fulfilled]: (state, action) => action.payload,
    [removeProduct.fulfilled]: (state, action) => null,
  },
});

export const { newProduct, resetProduct } = productSlice.actions;

export const selectProduct = ({ eCommerceApp }) => eCommerceApp.product;

export default productSlice.reducer;
