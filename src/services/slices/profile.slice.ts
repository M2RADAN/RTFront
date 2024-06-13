import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUser } from "../thunk/profile";

export interface IUser {
  email: string;
  userId: string;
}
export interface IProfileSlice {
  isPending: boolean;
  user?: IUser;
  isAuth: boolean;
  errorMessage?: string;
}

const initialState: IProfileSlice = { isPending: false, isAuth: false };

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getUser.fulfilled,
      (store, action: PayloadAction<IUser>) => {
        store.user = action.payload;
        store.isAuth = true;
      }
    );
  },
});
export default profileSlice.reducer;
export const {} = profileSlice.actions;
