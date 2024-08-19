import { configureStore } from "@reduxjs/toolkit";
import app from "../reducers/app";
import rides from "../reducers/rides";
import user from "../reducers/user";

export const store = configureStore({
  reducer: {
    app,
    rides,
    user,
  },
});
