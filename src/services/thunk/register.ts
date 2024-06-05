import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../slices/auth.slice";

export interface IUserCreds {
  email: string;
  password: string;
}

interface IRegisterResponse {
  success?: boolean;
  message?: string;
  data: IUser;
}

export const registerUser = createAsyncThunk(
  "auth/register",
  async (creds: IUserCreds, api) => {
    const result: IRegisterResponse = await fetch(
      "http://localhost:3000/auth/register",
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
  }
);
