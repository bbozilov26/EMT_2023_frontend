import { combineReducers } from "@reduxjs/toolkit";
import order from "./orderSlice";
import orders from "./ordersSlice";
import product from "./productSlice";
import products from "./productsSlice";
import dailyCheckIns from "./dailyCheckInsSlice";
import dailyCheckIn from "./dailyCheckInSlice";

const reducer = combineReducers({
  products,
  product,
  orders,
  order,
  dailyCheckIns,
  dailyCheckIn,
});

export default reducer;
