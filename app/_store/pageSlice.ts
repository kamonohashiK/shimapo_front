import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface PageState {
    isIslandInfo: boolean;
    uid: string;
    name: string;
    prefecture: string;
    city: string;
    kana: string;
    enName: string;
    mainImage: string;
    imageList: any[];
    questionList: any[];
}

const initialState: PageState = {
    isIslandInfo: false,
    uid: "",
    name: "島の名前",
    prefecture: "都道府県名",
    city: "市区町村名",
    kana: "かな",
    enName: "English Name",
    mainImage: "",
    imageList: [],
    questionList: [],
}

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setIslandInfo: (state, action: PayloadAction<PageState>) => {
        state.isIslandInfo = true;
        state.uid = action.payload.uid;
        state.name = action.payload.name;
        state.prefecture = action.payload.prefecture;
        state.city = action.payload.city;
        state.kana = action.payload.kana;
        state.enName = action.payload.enName;
        state.mainImage = action.payload.mainImage;
        state.imageList = action.payload.imageList;
        state.questionList = action.payload.questionList;
    },
  },
});

export const { setIslandInfo } = pageSlice.actions;

export default pageSlice.reducer;