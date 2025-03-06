import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  laborTau: 5,
  laborPercentageTau: 0.5,
};

const tauSlice = createSlice({
  name: "tau",
  initialState,
  reducers: {
    setTau: (state, action) => {
      state.laborTau = action.payload.laborTau;
      state.laborPercentageTau = action.payload.laborPercentageTau;
    },
  },
});

export const { setTau } = tauSlice.actions;
export default tauSlice.reducer;
