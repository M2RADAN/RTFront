import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../slices/auth.slice";
import { IUserCreds } from "./register";

interface ILoginResponse {
  success?: boolean;
  message?: string;
  data: IUser;
}

export const loginUser = createAsyncThunk(
  "auth/login",
  async (creds: IUserCreds, api) => {
    const result: ILoginResponse = await fetch(
      "http://localhost:3000/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(creds),
      }
    ).then((res) => res.json());

    if (!result.success) return api.rejectWithValue(result.message);
    return result.data;
  }
);
