import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  uid: string;
  displayName: string;
  photoUrl: string;
}

const initialState: UserState = {
  uid: "",
  displayName: "",
  photoUrl: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginInfo: (state, action) => {
        state.uid = action.payload.uid;
        state.displayName = action.payload.displayName;
        state.photoUrl = action.payload.photoUrl;
    }
  },
});

export const { setLoginInfo } = userSlice.actions;

export default userSlice.reducer;
