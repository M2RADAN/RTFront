import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRouteData, saveRoute } from "../thunk/saveRoute";

export interface TRouteLocal {
  errorMessage?: string;
  isPending: boolean;
  message?: string;
}

const initialState: TRouteLocal = {
  isPending: false,
};

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
      .addCase(saveRoute.rejected, (store, action) => {
        store.isPending = false;
      });
  },
});
export default routeLocalSlice.reducer;
export const {} = routeLocalSlice.actions;
