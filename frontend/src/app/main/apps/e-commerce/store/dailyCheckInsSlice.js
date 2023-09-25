// dailyCheckInsSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define an initial state for daily check-ins
const initialState = {
  dailyCheckIns: [],
  loading: false,
  error: null,
};

// Define an async thunk to fetch all daily check-ins
export const fetchAllDailyCheckIns = createAsyncThunk(
  "dailyCheckIns/fetchAll",
  async () => {
    const response = await axios.get("/daily-check-ins");
    return response.data;
  }
);

// Define an async thunk to fetch daily check-ins by user ID
export const fetchDailyCheckInsByUserId = createAsyncThunk(
  "dailyCheckIns/fetchByUserId",
  async (userId) => {
    const response = await axios.get(`/daily-check-ins/${userId}`);
    return response.data;
  }
);

// Define an async thunk to claim a daily check-in
export const claimDailyCheckIn = createAsyncThunk(
  "dailyCheckIns/claim",
  async (data) => {
    const response = await axios.post(
      "/daily-check-ins/claim-daily-check-in",
      data
    );
    return response.data;
  }
);

// Create a daily check-ins slice
const dailyCheckInsSlice = createSlice({
  name: "dailyCheckIns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDailyCheckIns.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllDailyCheckIns.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyCheckIns = action.payload;
      })
      .addCase(fetchAllDailyCheckIns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDailyCheckInsByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDailyCheckInsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyCheckIns = action.payload;
      })
      .addCase(fetchDailyCheckInsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(claimDailyCheckIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(claimDailyCheckIn.fulfilled, (state, action) => {
        state.loading = false;
        // Update the claimed status in the state based on the response
        state.dailyCheckIns = state.dailyCheckIns.map((checkIn) => {
          if (checkIn.id === action.payload.id) {
            return {
              ...checkIn,
              claimed: action.payload.claimed,
            };
          }
          return checkIn;
        });
      })
      .addCase(claimDailyCheckIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dailyCheckInsSlice.reducer;
