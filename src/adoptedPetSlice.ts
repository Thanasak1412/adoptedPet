import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// types
import { PetState, Pet } from "./APIResponseTypes";

const initialState: PetState = {
  isLoading: false,
  isError: false,
  pet: null,
};

export const adoptedPetSlice = createSlice({
  name: "adoptedPet",
  initialState,
  reducers: {
    adopted: (state, action: PayloadAction<{ pet: Pet }>) => {
      state.pet = action.payload.pet;
    },
  },
});

export const { adopted } = adoptedPetSlice.actions;
export default adoptedPetSlice.reducer;
