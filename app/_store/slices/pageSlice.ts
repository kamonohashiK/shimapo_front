import { appText } from "@/app/_constants/text";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// FIXME: デカすぎるので分割したい
interface PageState {
  isMobile: boolean;
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
  thumbnailList: null | any[];
  questionList: null | any[];
  focusedQuestionId: string;
  focusedQuestion: string;
}

interface TextState {
  textHeader: string;
  textBody: string;
}

interface ReloadState {
  thumbnailList: any[];
  questionList: any[];
}

interface QuestionState {
  focusedQuestionId: string;
  focusedQuestion: string;
}

const initialState: PageState = {
  isMobile: true,
  isIslandInfo: false,
  textHeader: appText.SIDEBAR_TITLE_TOP,
  textBody: appText.SIDEBAR_CONTENT_TOP,
  uid: "",
  name: "島の名前",
  prefecture: "都道府県名",
  city: "市区町村名",
  kana: "かな",
  enName: "English Name",
  mainImage: "",
  thumbnailList: null,
  questionList: null,
  focusedQuestionId: "",
  focusedQuestion: "",
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    setIslandInfo: (state, action: PayloadAction<PageState>) => {
      state.isIslandInfo = true;
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.prefecture = action.payload.prefecture;
      state.city = action.payload.city;
      state.kana = action.payload.kana;
      state.enName = action.payload.enName;
      state.mainImage = action.payload.mainImage;
      state.thumbnailList = action.payload.thumbnailList;
      state.questionList = action.payload.questionList;
    },
    showSidebarText: (state, action: PayloadAction<TextState>) => {
      state.textHeader = action.payload.textHeader;
      state.textBody = action.payload.textBody;
    },
    reloadIslandInfo: (state, action: PayloadAction<ReloadState>) => {
      state.thumbnailList = action.payload.thumbnailList;
      state.questionList = action.payload.questionList;
    },
    setFocusedQuestion: (state, action: PayloadAction<QuestionState>) => {
      state.focusedQuestionId = action.payload.focusedQuestionId;
      state.focusedQuestion = action.payload.focusedQuestion;
    },
    setThumbnailList: (state, action: PayloadAction<any>) => {
      state.thumbnailList = action.payload;
    },
    setQuestionList: (state, action: PayloadAction<any>) => {
      state.questionList = action.payload;
    },
  },
});

export const {
  setIsMobile,
  setIslandInfo,
  showSidebarText,
  reloadIslandInfo,
  setFocusedQuestion,
  setThumbnailList,
  setQuestionList,
} = pageSlice.actions;

export default pageSlice.reducer;
