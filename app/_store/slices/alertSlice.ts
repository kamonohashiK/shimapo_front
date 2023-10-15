import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
  isShown: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

const initialState: AlertState = {
  isShown: false,
  message: "",
  severity: undefined,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<AlertState>) => {
      state.isShown = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    hideAlert: (state) => {
      state.isShown = false;
    },
  },
});

export const { setAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
