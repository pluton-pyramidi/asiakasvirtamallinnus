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

// Selector to derive hoitoonohjausMuu
export const calculateHoitoonohjausMuu = (state) => {
  const hoitoonohjausTotal =
    state.hoitoonohjaus.hoitoonohjausTAU +
    state.hoitoonohjaus.hoitoonohjausSteppedCare;

  if (hoitoonohjausTotal > 1) {
    return 0;
  } else {
    return 1 - hoitoonohjausTotal;
  }
};

export default hoitoonohjausSlice.reducer;
