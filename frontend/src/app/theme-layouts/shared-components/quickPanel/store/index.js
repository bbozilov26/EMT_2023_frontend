import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
import state from "./stateSlice";
import shoppingCart from "./shoppingCartSlice";

const reducer = combineReducers({
  data,
  state,
  shoppingCart,
});
export default reducer;
