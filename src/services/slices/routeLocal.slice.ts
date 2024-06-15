import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRouteData, saveRoute } from "../thunk/saveRoute";
import { findRoutes } from "../thunk/findRoutes";
import { IPoint } from "./note.slice";

export interface TRouteLocal {
  errorMessage?: string;
  isPending: boolean;
  message?: string;
  routes?: IRoute;
}

const initialState: TRouteLocal = {
  isPending: false,
};
interface IRoute {
  userId: string;
  name: string;
  points: IPoint[];
}
export const routeLocalSlice = createSlice({
  name: "routeLocal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        saveRoute.fulfilled,
        (store, action: PayloadAction<IRouteData>) => {
          store.isPending = false;
          store.message = action.payload.message;
        }
      )
      .addCase(saveRoute.pending, (store) => {
        store.isPending = true;
      })
      .addCase(saveRoute.rejected, (store) => {
        store.isPending = false;
      })
      .addCase(
        findRoutes.fulfilled,
        (store, action: PayloadAction<TRouteLocal>) => {
          store.isPending = false;
          store.routes = action.payload.routes;
        }
      )
      .addCase(findRoutes.pending, (store) => {
        store.isPending = true;
      })
      .addCase(findRoutes.rejected, (store, action) => {
        store.isPending = false;
        store.errorMessage = action.payload as string;
      });
  },
});
export default routeLocalSlice.reducer;
export const {} = routeLocalSlice.actions;
