import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPoint } from "../slices/note.slice";
import { IRouteInfo } from "../slices/route.slice";
export interface INotesReq {
  points: {
    lat: number;
    lon: number;
  }[];
}

export const showRoute = createAsyncThunk<IRouteInfo, IPoint[]>(
  "showRoute",
  async (points, api) => {
    const result = await fetch(
      "https://routing.api.2gis.com/carrouting/6.0.0/global?key=916a51a9-06da-48fb-bba4-c9073a4876cc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          points: structuredClone(points),
        }),
      }
    ).then((res) => res.json());

    if (result.type !== "result") return api.rejectWithValue(result.message);
    return result.result;
  }
);
