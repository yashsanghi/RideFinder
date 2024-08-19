import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  currentTab: 0,
  selectedState: null,
  selectedCity: null,
};

export const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSelectedState: (state, action) => {
      state.selectedState = action.payload;
      state.selectedCity = null;
    },
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
  },
});

export const { changeTab, setLoading, setSelectedState, setSelectedCity } =
  app.actions;

export default app.reducer;
