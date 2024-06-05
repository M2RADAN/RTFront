import { createSlice, isPending, PayloadAction } from "@reduxjs/toolkit";
import { registerUser } from "../thunk/register";
import { loginUser } from "../thunk/login";

export interface IUser {
  email: string;
  userId: string;
}

export interface IAuthSlice {
  isAuth: boolean;
  isPending: boolean;
  user?: IUser;
  errorMessage?: string;
}

const initialState: IAuthSlice = {
  isAuth: false,
  isPending: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (store) => {
        store.isPending = true;
      })
      .addCase(registerUser.fulfilled, (store) => {
        store.isPending = false;
      })
      .addCase(registerUser.rejected, (store, action) => {
        store.isPending = false;
        store.errorMessage = action.payload as string;
      })

      .addCase(loginUser.pending, (store) => {
        store.isPending = true;
      })
      .addCase(loginUser.fulfilled, (store) => {
        store.isPending = false;
        store.isAuth = true;
      })
      .addCase(loginUser.rejected, (store, action) => {
        store.isPending = false;
        store.errorMessage = action.payload as string;
      });
  },
});

export default authSlice.reducer;
