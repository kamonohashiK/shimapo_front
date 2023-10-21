import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DialogState {
  isShown: boolean;
  type: string;
  disabled: boolean;
}

const initialState: DialogState = {
  isShown: false,
  type: "",
  disabled: false,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    showDialog: (state, action: PayloadAction<DialogState>) => {
      state.isShown = true;
      state.type = action.payload.type;
    },
    hideDialog: (state) => {
      state.isShown = false;
    },
    toggleDisabled: (state) => {
      state.disabled = !state.disabled;
    },
  },
});

export const { showDialog, hideDialog, toggleDisabled } = dialogSlice.actions;

export default dialogSlice.reducer;
