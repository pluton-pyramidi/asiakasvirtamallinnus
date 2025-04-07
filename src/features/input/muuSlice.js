import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sufficiencyRateMuu: 0.5,
};

const muuSlice = createSlice({
  name: "muu",
  initialState,
  reducers: {
    setMuu: (state, action) => {
      state.sufficiencyRateMuu = action.payload.sufficiencyRateMuu;
    },
  },
});

export const { setMuu } = muuSlice.actions;

// Selectors to derive variables from this state
export const calculateInsufficencyRateMuu = (state) =>
  1 - state.muu.sufficiencyRateMuu;

export default muuSlice.reducer;
