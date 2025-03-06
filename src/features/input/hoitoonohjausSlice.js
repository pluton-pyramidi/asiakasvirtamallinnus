import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hoitoonohjausTAU: 0.5,
  hoitoonohjausSteppedCare: 0.5,
};

const hoitoonohjausSlice = createSlice({
  name: "hoitoonohjaus",
  initialState,
  reducers: {
    setHoitoonohjaus: (state, action) => {
      state.hoitoonohjausTAU = action.payload.hoitoonohjausTAU;
      state.hoitoonohjausSteppedCare = action.payload.hoitoonohjausSteppedCare;
    },
  },
});

export const { setHoitoonohjaus } = hoitoonohjausSlice.actions;
export default hoitoonohjausSlice.reducer;
