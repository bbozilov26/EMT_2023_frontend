import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "eCommerceApp/products/getProducts",
  async () => {
    try {
      const response = await axios.get("/products/all");
      const data = response.data.map((el) => ({
        id: el.id,
        image: el.image,
        name: el.title,
        description: el.description,
        quantity: el.quantity,
        price: el.price,
        category: el.category,
      }));

      return data;
    } catch (error) {
      // Handle errors here if needed
      throw error;
    }
  }
);

// export const removeProducts = createAsyncThunk(
//   "eCommerceApp/products",
//   async (productIds, { dispatch, getState }) => {
//     await axios.delete("/api/ecommerce/products", { data: productIds });
//
//     return productIds;
//   }
// );

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } =
  productsAdapter.getSelectors((state) => state.eCommerceApp.products);

const productsSlice = createSlice({
  name: "eCommerceApp/products",
  initialState: productsAdapter.getInitialState({
    searchText: "",
  }),
  reducers: {
    setProductsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
  },
  extraReducers: {
    [getProducts.fulfilled]: productsAdapter.setAll,
  },
});

export const { setProductsSearchText } = productsSlice.actions;

export const selectProductsSearchText = ({ eCommerceApp }) =>
  eCommerceApp.products.searchText;

export default productsSlice.reducer;
