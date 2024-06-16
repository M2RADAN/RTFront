import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../slices/auth.slice";
import { IUserCreds } from "./register";

export const logoutUser = createAsyncThunk("auth/logout", async (_, api) => {
  const result = await fetch("http://localhost:3000/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => res.json());

  if (!result.success) return api.rejectWithValue(result.message);
  return result.data;
});
