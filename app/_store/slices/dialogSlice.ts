import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DialogState {
  isShown: boolean;
  type: string;
}

const initialState: DialogState = {
  isShown: false,
  type: "",
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
  },
});

export const { showDialog, hideDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
