import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hoitoonOhjausTAU: 5,
  hoitoonOhjausSteppedCare: 0.5,
};

const hoitoonOhjausSlice = createSlice({
  name: "hoitoonOhjaus",
  initialState,
  reducers: {
    sethoitoonOhjaus: (state, action) => {
      state.hoitoonOhjausTAU = action.payload.hoitoonOhjausTAU;
      state.hoitoonOhjausSteppedCare = action.payload.hoitoonOhjausSteppedCare;
    },
  },
});

export const { setHoitoonOhjaus } = hoitoonOhjausSlice.actions;
export default hoitoonOhjausSlice.reducer;
