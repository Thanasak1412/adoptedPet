import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Animal } from "./APIResponseTypes";

const initialState = {
  value: {
    location: "",
    animal: "" as Animal,
    breed: "",
  },
};

export const searchParamsSlice = createSlice({
  name: "searchParams",
  initialState,
  reducers: {
    all: (
      state,
      action: PayloadAction<{ location: string; animal: Animal; breed: string }>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { all } = searchParamsSlice.actions;
export default searchParamsSlice.reducer;
