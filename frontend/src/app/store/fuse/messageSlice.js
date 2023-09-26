import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: null,
  options: {
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    autoHideDuration: 2000,
    message: "Hi",
    variant: null,
  },
};
const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    showMessage: (state, action) => {
      state.state = true;
      state.options = {
        ...initialState.options,
        ...action.payload,
      };
    },
    showErrorMessage: (state, action) => {
      state.state = true;
      state.options = {
        ...initialState.options,
        message: action.payload,
        variant: "error",
      };
    },
    showSuccessMessage: (state, action) => {
      state.state = true;
      state.options = {
        ...initialState.options,
        message: action.payload,
        variant: "success",
      };
    },
    hideMessage: (state, action) => {
      state.state = null;
    },
  },
});

export const {
  hideMessage,
  showMessage,
  showSuccessMessage,
  showErrorMessage,
} = messageSlice.actions;

export const selectFuseMessageState = ({ fuse }) => fuse.message.state;

export const selectFuseMessageOptions = ({ fuse }) => fuse.message.options;

export default messageSlice.reducer;
