import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hoitoonohjausStepOne: 0.5,
  laborStepOne: 5,
  laborPercentageStepOne: 0.5,
  sufficiencyRateStepOne: 0.5,
  stepOneToStepTwoRate: 0.6,
  stepOneToMuuRate: 0.2,
  meetingDurationStepOne: 90,
  laborEfficiencyStepOne: 0.8,
};

const stepOneSlice = createSlice({
  name: "stepOne",
  initialState,
  reducers: {
    setStepOne: (state, action) => {
      state.hoitoonohjausStepOne = action.payload.hoitoonohjausStepOne;
      state.laborStepOne = action.payload.laborStepOne;
      state.laborPercentageStepOne = action.payload.laborPercentageStepOne;
      state.sufficiencyRateStepOne = action.payload.sufficiencyRateStepOne;
      state.stepOneToStepTwoRate = action.payload.stepOneToStepTwoRate;
      state.stepOneToMuuRate = action.payload.stepOneToMuuRate;
      state.meetingDurationStepOne = action.payload.meetingDurationStepOne;
      state.laborEfficiencyStepOne = action.payload.laborEfficiencyStepOne;
    },
  },
});

export const { setStepOne } = stepOneSlice.actions;

// Selectors to derive variables from this state
export const calculateHoitoonohjausStepTwo = (state) =>
  1 - state.stepOne.hoitoonohjausStepOne;

export default stepOneSlice.reducer;
