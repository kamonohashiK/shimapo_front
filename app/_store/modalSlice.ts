import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isShown: boolean;
  type: string;
}

const initialState: ModalState = {
  isShown: false,
  type: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<ModalState>) => {
      state.isShown = true;
      state.type = action.payload.type;
    },
    hideModal: (state) => {
      state.isShown = false;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
