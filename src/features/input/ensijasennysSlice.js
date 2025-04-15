import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  laborEnsijasennys: 1,
  laborPercentageEnsijasennys: 1,
  meetingDurationEnsijasennys: 90,
  laborEfficiencyEnsijasennys: 0.8,
};

const ensijasennysSlice = createSlice({
  name: "ensijasennys",
  initialState,
  reducers: {
    setEnsijasennys: (state, action) => {
      state.laborEnsijasennys = action.payload.laborEnsijasennys;
      state.laborPercentageEnsijasennys = action.payload.laborPercentageEnsijasennys;
      state.meetingDurationEnsijasennys = action.payload.meetingDurationEnsijasennys;
      state.laborEfficiencyEnsijasennys = action.payload.laborEfficiencyEnsijasennys;
    },
  },
});

export const { setEnsijasennys } = ensijasennysSlice.actions;
export default ensijasennysSlice.reducer;
