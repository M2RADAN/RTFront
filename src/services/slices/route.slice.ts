import { createSlice, isPending, PayloadAction } from "@reduxjs/toolkit";
import { IPoint } from "./note.slice";
import { showRoute } from "../thunk/route";
import { checkoutRoute } from "../thunk/checkoutRoute";

export interface TNotesNullable {
  routeInfo?: IRouteInfo;
  checkoutRouteInfo?: IRouteInfo;
  checkoutPoints?: IPoint[];
  selectedRouteId?: string;

  errorMessage?: string;
  isPending: boolean;
}

type TGeometry = {
  color: string;
  length: number;
  selection: string;
  style: string;
};

export type IRouteInfo = Array<{
  algorithm: string;
  id: string;

  begin_pedestrian_path: {
    geometry: TGeometry;
  };
  end_pedestrian_path: {
    geometry: TGeometry;
  };

  maneuvers: {
    comment: string;
    icon: string;
    id: string;
    outcoming_path: {
      distance: number;
      duration: number;
      geometry: TGeometry[];
      names: string[];
    };
    outcoming_path_comment: string;
    type: string;
  }[];
  reliability: number;

  route_id: string;
  total_distance: number;
  total_duration: number;

  type: string;
  ui_total_distance: {
    unit: string;
    value: string;
  };

  ui_total_duration: string;

  waypoints: {
    original_point: IPoint;
    projected_point: IPoint;
    transit: boolean;
  }[];
}>;

const initialState: TNotesNullable = {
  isPending: false,
};

export const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        showRoute.fulfilled,
        (store, action: PayloadAction<IRouteInfo>) => {
          store.isPending = false;
          store.routeInfo = action.payload;
        }
      )
      .addCase(showRoute.pending, (store) => {
        store.isPending = true;
      })
      .addCase(showRoute.rejected, (store) => {
        store.isPending = false;
      })
      .addCase(
        checkoutRoute.fulfilled,
        (
          store,
          action: PayloadAction<[IRouteInfo, IPoint[] | undefined, string]>
        ) => {
          store.checkoutRouteInfo = action.payload[0];
          store.checkoutPoints = action.payload[1] || [];
          store.selectedRouteId = action.payload[2];
        }
      )
      .addCase(checkoutRoute.pending, (store) => {
        store.isPending = true;
      });
  },
});

export default routeSlice.reducer;
export const {} = routeSlice.actions;
