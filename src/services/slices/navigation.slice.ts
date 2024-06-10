import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NAVIGATIONS } from "../../const/constants";

export type THeaderForms =
  (typeof NAVIGATIONS)[keyof typeof NAVIGATIONS]["ACTION"];

export interface INavigationSlice {
  active: THeaderForms | null;
}

const initialState: INavigationSlice = {
  active: null,
};

export const navigateSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setActive: (store, action: PayloadAction<THeaderForms>) => {
      store.active = action.payload;
    },

    clearActvie: (store) => {
      store.active = null;
    },
  },
});

export default navigateSlice.reducer;
export const { setActive, clearActvie } = navigateSlice.actions;
