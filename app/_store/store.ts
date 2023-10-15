import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./slices/pageSlice";
import userReducer from "./slices/userSlice";
import mapReducer from "./slices/mapSlice";
import alertReducer from "./slices/alertSlice";
import dialogReducer from "./slices/dialogSlice";

export const store = configureStore({
  reducer: {
    page: pageReducer,
    user: userReducer,
    map: mapReducer,
    alert: alertReducer,
    dialog: dialogReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
