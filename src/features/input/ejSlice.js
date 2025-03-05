import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  laborEj: 5,
  laborPercentageEj: 0.5,
};

const ejSlice = createSlice({
  name: "ej",
  initialState,
  reducers: {
    setEj: (state, action) => {
      state.laborEj = action.payload.laborEj;
      state.laborPercentageEj = action.payload.laborPercentageEj;
    },
  },
});

export const { setEj } = ejSlice.actions;
export default ejSlice.reducer;
