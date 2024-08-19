import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../thunks/user.thunk";

const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  user: null,
};

export const fetchUserAsync = createAsyncThunk("user/fetchUser", async () => {
  const response = await fetchUser();
  return response.data;
});

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.user = null;
      })
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(fetchUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
        state.user = null;
      });
  },
});



export default user.reducer;
