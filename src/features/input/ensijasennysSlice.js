import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  laborEnsijasennys: 5,
  laborPercentageEnsijasennys: 0.5,
};

const ensijasennysSlice = createSlice({
  name: "ensijasennys",
  initialState,
  reducers: {
    setEnsijasennys: (state, action) => {
      state.laborEnsijasennys = action.payload.laborEnsijasennys;
      state.laborPercentageEnsijasennys =
        action.payload.laborPercentageEnsijasennys;
    },
  },
});

export const { setEnsijasennys } = ensijasennysSlice.actions;
export default ensijasennysSlice.reducer;
