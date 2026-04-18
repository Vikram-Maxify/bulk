import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice.js";
import excelReducer from "./slice/excelSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    excel: excelReducer, // 👈 add this
  },
});