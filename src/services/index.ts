import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./slices/auth.slice";
import navigationReducer from "./slices/navigation.slice";
import profileReducer from "./slices/profile.slice";
import noteReducer from "./slices/note.slice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    navigation: navigationReducer,
    profile: profileReducer,
    note: noteReducer,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
