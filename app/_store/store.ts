import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./pageSlice";
import userReducer from "./userSlice";
import mapReducer from "./mapSlice";

export const store = configureStore({
  reducer: {
    page: pageReducer,
    user: userReducer,
    map: mapReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
