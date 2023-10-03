import { createSlice } from "@reduxjs/toolkit";

interface modalState {
  isShown: boolean;
}

const initialState: modalState = {
  isShown: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state) => {
      state.isShown = true;
    },
    hideModal: (state) => {
      state.isShown = false;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
