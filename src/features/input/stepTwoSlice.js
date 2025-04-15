import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  laborStepTwo: 1,
  laborPercentageStepTwo: 1,
  sufficiencyRateStepTwo: 0.5,
  stepTwoToMuuRate: 0.2,
  meetingDurationStepTwo: 90,
  laborEfficiencyStepTwo: 0.8,
};

const stepTwoSlice = createSlice({
  name: "stepTwo",
  initialState,
  reducers: {
    setStepTwo: (state, action) => {
      state.laborStepTwo = action.payload.laborStepTwo;
      state.laborPercentageStepTwo = action.payload.laborPercentageStepTwo;
      state.sufficiencyRateStepTwo = action.payload.sufficiencyRateStepTwo;
      state.stepTwoToMuuRate = action.payload.stepTwoToMuuRate;
      state.meetingDurationStepTwo = action.payload.meetingDurationStepTwo;
      state.laborEfficiencyStepTwo = action.payload.laborEfficiencyStepTwo;
    },
  },
});

export const { setStepTwo } = stepTwoSlice.actions;

// Selectors to derive variables from this state
export const calculateInsufficencyRateStepTwo = (state) => 1 - state.stepTwo.sufficiencyRateStepTwo;
export const calculateStepTwoToQueueRate = (state) => 1 - state.stepTwo.stepTwoToMuuRate;
export default stepTwoSlice.reducer;
