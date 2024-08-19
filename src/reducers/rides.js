import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUniqueValues } from "../selectors";
import { fetchRides } from "../thunks/rides.thunk";

const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  rides: null,
  states: null,
  cities: null,
};

export const fetchRidesAsync = createAsyncThunk(
  "rides/fetchRides",
  async () => {
    const response = await fetchRides();
    return response.data;
  }
);

export const rides = createSlice({
  name: "rides",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRidesAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.rides = null;
      })
      .addCase(fetchRidesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.rides = action.payload;
        state.states = getUniqueValues(
          action.payload.map((ride) => ride?.state || "")
        );
        state.cities = getUniqueValues(
          action.payload.map((ride) => ride?.city || "")
        );
      })
      .addCase(fetchRidesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
        state.rides = null;
      });
  },
});

export default rides.reducer;
