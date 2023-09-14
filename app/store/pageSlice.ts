// redux-toolkitを試しに使ってみる
import { createSlice } from "@reduxjs/toolkit";

export interface PageState {
    isIslandInfo: boolean;
}

const initialState: PageState = {
    isIslandInfo: false,
}

export const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        setIslandInfo: (state) => {
            state.isIslandInfo = true;
        }
    }
});

export const { setIslandInfo } = pageSlice.actions;

export default pageSlice.reducer;