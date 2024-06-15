import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRouteInfo } from "../slices/route.slice";
import { IPoint } from "../slices/note.slice";
import { RootState } from "..";
/// заебсь
export const checkoutRoute = createAsyncThunk<
  [IRouteInfo, IPoint[] | undefined, string],
  string
>("checkoutRoute", async (id, api) => {
  const store = api.getState() as RootState;
  const selectedRoute = store.routeLocal.routes?.find((el) => el._id === id);
  const points = selectedRoute?.points;
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
  return [result.result, points, id];
});
