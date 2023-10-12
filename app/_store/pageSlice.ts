import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface PageState {
  isIslandInfo: boolean;
  textHeader: string;
  textBody: string;
  uid: string;
  name: string;
  prefecture: string;
  city: string;
  kana: string;
  enName: string;
  mainImage: string;
  imageList: any[];
  questionList: any[];
  focusedQuestionId: string;
  focusedQuestion: string;
}

interface TextState {
  textHeader: string;
  textBody: string;
}

interface ReloadState {
  imageList: any[];
  questionList: any[];
}

interface QuestionState {
  focusedQuestionId: string;
  focusedQuestion: string;
}

const initialState: PageState = {
  isIslandInfo: false,
  textHeader: "ようこそ",
  textBody: "最初のページ",
  uid: "",
  name: "島の名前",
  prefecture: "都道府県名",
  city: "市区町村名",
  kana: "かな",
  enName: "English Name",
  mainImage: "",
  imageList: [],
  questionList: [],
  focusedQuestionId: "",
  focusedQuestion: "",
};

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
    showSidebarText: (state, action: PayloadAction<TextState>) => {
      state.isIslandInfo = false;
      state.textHeader = action.payload.textHeader;
      state.textBody = action.payload.textBody;
    },
    reloadIslandInfo: (state, action: PayloadAction<ReloadState>) => {
      state.imageList = action.payload.imageList;
      state.questionList = action.payload.questionList;
    },
    setFocusedQuestion: (state, action: PayloadAction<QuestionState>) => {
      state.focusedQuestionId = action.payload.focusedQuestionId;
      state.focusedQuestion = action.payload.focusedQuestion;
    },
  },
});

export const {
  setIslandInfo,
  showSidebarText,
  reloadIslandInfo,
  setFocusedQuestion,
} = pageSlice.actions;

export default pageSlice.reducer;
