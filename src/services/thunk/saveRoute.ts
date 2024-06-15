import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPoint } from "../slices/note.slice";
import { IRoute } from "../slices/routeLocal.slice";
import { RootState } from "..";

export interface IRouteData {
  message: string;
  route: IRoute;
}

export interface IRouteCreds {
  name: string;
  points: IPoint[];
}
export const saveRoute = createAsyncThunk<IRouteData, IRouteCreds>(
  "saveRoute",
  async (data, api) => {
    const result = await fetch(
      "http://localhost:3000/profile/routes/createRoute",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }
    ).then((res) => res.json());

    if (result.success !== true) return api.rejectWithValue(result.message);
    return result;
  }
);
