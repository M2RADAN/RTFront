import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface INoteSlice {
  lnglat: number[] | null;
}
const initialState: INoteSlice = {
  lnglat: null,
};
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
  },
});
export default noteSlice.reducer;
export const { setLnglat, clearLnglat } = noteSlice.actions;
