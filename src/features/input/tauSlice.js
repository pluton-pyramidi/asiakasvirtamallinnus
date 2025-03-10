import { createSlice } from "@reduxjs/toolkit";

// TAU (Treatment-as-usual) state for the inputvalues and parameters of this treatment module
const initialState = {
  laborTau: 5,
  laborPercentageTau: 0.5,
  sufficiencyRateTau: 0.45,
  tauToMuuRate: 0.5,
  meetingDurationTau: 90,
  laborEfficiencyTau: 0.7,
};

const tauSlice = createSlice({
  name: "tau",
  initialState,
  reducers: {
    setTau: (state, action) => {
      state.laborTau = action.payload.laborTau;
      state.laborPercentageTau = action.payload.laborPercentageTau;
      state.sufficiencyRateTau = action.payload.sufficiencyRateTau;
      state.tauToMuuRate = action.payload.tauToMuuRate;
      state.meetingDurationTau = action.payload.meetingDurationTau;
      state.laborEfficiencyTau = action.payload.laborEfficiencyTau;
    },
  },
});

export const { setTau } = tauSlice.actions;

// Selectors to derive variables from this state
export const calculateInsufficencyRateTau = (state) =>
  1 - state.tau.sufficiencyRateTau;

export const calculateTauToQueueRate = (state) => 1 - state.tau.tauToMuuRate;

export default tauSlice.reducer;
