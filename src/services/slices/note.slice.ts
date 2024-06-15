import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface INoteSlice {
  notes: IPoint[] | null;
}
const initialState: INoteSlice = {
  notes: null,
};
export interface IPoint {
  lat: number;
  lon: number;
}

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setPoints: (store, action: PayloadAction<IPoint[]>) => {
      store.notes = action.payload;
    },
    clearPoints: (store) => {
      store.notes = null;
    },
  },
});
export default noteSlice.reducer;
export const { setPoints, clearPoints, setLnglat, clearLnglat } =
  noteSlice.actions;
