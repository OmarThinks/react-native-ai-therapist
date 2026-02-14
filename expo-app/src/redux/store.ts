import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { settingsSlice } from "./settingsSlice/settingsSlice";

const store = configureStore({
  reducer: {
    [settingsSlice.name]: settingsSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}

// Infer the `RootState` and `AppDispatch` types from the store itself
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch;

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector = useSelector.withTypes<RootState>();

export { store, useAppDispatch, useAppSelector };
export type { AppDispatch, RootState };
