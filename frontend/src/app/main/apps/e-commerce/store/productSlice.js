import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FuseUtils from "@fuse/utils";
import axios from "../../../../axios/axios";

export const getProduct = createAsyncThunk(
  "eCommerceApp/product/getProduct",
  async ({ productId }) => {
    const response = await axios.get(`/products/${productId}`, {
      baseURL: "http://localhost:9090/",
    });
    const responseData = await response.data;

    if (responseData !== undefined) {
      const data = {
        id: responseData.id.id,
        image: responseData.image,
        name: responseData.title,
        description: responseData.description,
        quantity: responseData.quantity,
        price: responseData.price,
        category: responseData.category,
        active: true,
      };

      return data;
    }

    return null;
  }
);

export const removeProduct = createAsyncThunk(
  "eCommerceApp/product/removeProduct",
  async ({ id }) => {
    await axios.delete(`/products/delete/${id}`, {
      baseURL: "http://localhost:9090/",
    });
    return id;
  }
);

// Async thunk for creating a new product
export const createProduct = createAsyncThunk(
  "eCommerceApp/product/createProduct",
  async ({ productDTO }) => {
    try {
      const response = await axios.post("/products/create", productDTO, {
        baseURL: "http://localhost:9090/",
      });
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
      const response = await axios.put(`/products/edit/${id}`, productDTO, {
        baseURL: "http://localhost:9090/",
      });
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
          category: "",
          images: [],
          price: "",
          quantity: "",
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
