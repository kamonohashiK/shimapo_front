import { createSlice } from "@reduxjs/toolkit";

interface PageState {
    isIslandInfo: boolean;
    uid: string;
    name: string;
    prefecture: string;
    city: string;
    kana: string;
    enName: string;
}

const initialState: PageState = {
    isIslandInfo: false,
    uid: "",
    name: "島の名前",
    prefecture: "都道府県名",
    city: "市区町村名",
    kana: "かな",
    enName: "English Name",
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