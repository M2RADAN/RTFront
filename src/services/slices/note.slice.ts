import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface INoteSlice {
  lnglat: number[] | null;
  notes: Tnotes | null;
}
const initialState: INoteSlice = {
  lnglat: null,
  notes: null,
};

export interface Tnotes {
  fPoint: number[];
  sPoint: number[];
  tPoint: number[];
}
export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setLnglat: (store, action: PayloadAction<number[]>) => {
      store.lnglat = action.payload;
    },

    clearLnglat: (store) => {
      store.lnglat = null;
    },
    setPoints: (store, action: PayloadAction<Tnotes>) => {
      store.notes = action.payload;
    },
    clearPoints: (store) => {
      store.lnglat = null;
    },
  },
});
export default noteSlice.reducer;
export const { setPoints, clearPoints, setLnglat, clearLnglat } =
  noteSlice.actions;
