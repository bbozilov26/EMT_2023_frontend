import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrder = createAsyncThunk(
  "eCommerceApp/order/getOrder",
  async (orderId) => {
    const response = await axios.get(`/orders/${orderId}`);
    const data = await response.data;

    return data === undefined ? null : data;
  }
);

export const createOrder = createAsyncThunk(
  "eCommerceApp/order/saveOrder",
  async (order) => {
    const response = await axios.put("/orders/add", order);
    const data = await response.data;

    return data;
  }
);

export const saveOrder = createAsyncThunk(
  "eCommerceApp/order/saveOrder",
  async (order) => {
    const response = await axios.put(`/orders/edit/${order.id}`, order);
    const data = await response.data;

    return data;
  }
);

const orderSlice = createSlice({
  name: "eCommerceApp/order",
  initialState: null,
  reducers: {
    resetOrder: () => null,
  },
  extraReducers: {
    [getOrder.fulfilled]: (state, action) => action.payload,
    [saveOrder.fulfilled]: (state, action) => action.payload,
    [createOrder.fulfilled]: (state, action) => action.payload,
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectOrder = ({ eCommerceApp }) => eCommerceApp.order;

export default orderSlice.reducer;
