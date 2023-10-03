import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./pageSlice";
import userReducer from "./userSlice";
import mapReducer from "./mapSlice";
import alertReducer from "./alertSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
  reducer: {
    page: pageReducer,
    user: userReducer,
    map: mapReducer,
    alert: alertReducer,
    modal: modalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
