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
      "https://routing.api.2gis.com/carrouting/6.0.0/global?key=e5fefe22-8131-439b-829f-c3d61be60e08",
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
