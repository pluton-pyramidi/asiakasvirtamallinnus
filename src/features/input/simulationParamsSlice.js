import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workingHoursDaily: 7.5, // Assumed working hours of a professional per day
  cycleDuration: 6, // Simulation treatment cycle duration in months
  simulationTimeSpan: 12, // Simulation time span in months (how long a period do you want to simulate?)
  treatmentDurationTau: 6, // Treatment duration for TAU in months
  treatmentDurationStepOne: 1, // Treatment duration for Step 1 in months
  treatmentDurationStepTwo: 3, // Treatment duration for Step 2 in months
};

const simulationParamsSlice = createSlice({
  name: "simulationParams",
  initialState,
  reducers: {
    setSimulationParams: (state, action) => {
      state.workingHoursDaily = action.payload.workingHoursDaily;
      state.cycleDuration = action.payload.cycleDuration;
      state.simulationTimeSpan = action.payload.simulationTimeSpan;
      state.treatmentDurationTau = action.payload.treatmentDurationTau;
      state.treatmentDurationStepOne = action.payload.treatmentDurationStepOne;
      state.treatmentDurationStepTwo = action.payload.treatmentDurationStepTwo;
    },
  },
});

export const { setSimulationParams } = simulationParamsSlice.actions;
export default simulationParamsSlice.reducer;
