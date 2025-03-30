import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const workingHoursDaily = 7.5;

// Thunk to calculate the simulation balance and return the result
export const calculateSimulationBalance = createAsyncThunk(
  "balance/calculateSimulationBalance",
  async (_, { getState }) => {
    const state = getState();

    // How many hours a professional is allocated to doing this treatment per week
    const treatmentHoursPerWeekEj =
      state.ensijasennys.laborPercentageEnsijasennys * workingHoursDaily * 5;
    const treatmentHoursPerWeekTau =
      state.tau.laborPercentageTau * workingHoursDaily * 5;
    const treatmentHoursPerWeekStepOne =
      state.stepOne.laborPercentageStepOne * workingHoursDaily * 5;
    const treatmentHoursPerWeekStepTwo =
      state.stepTwo.laborPercentageStepTwo * workingHoursDaily * 5;

    // How many appointments professional has per treatment per week rounded down
    const appointmentsPerWeekEj = Math.floor(
      treatmentHoursPerWeekEj /
        ((state.ensijasennys.meetingDurationEnsijasennys / 60) *
          state.ensijasennys.laborEfficiencyEnsijasennys)
    );
    const appointmentsPerWeekTau = Math.floor(
      treatmentHoursPerWeekTau /
        ((state.tau.meetingDurationTau / 60) * state.tau.laborEfficiencyTau)
    );
    const appointmentsPerWeekStepOne = Math.floor(
      treatmentHoursPerWeekStepOne /
        ((state.stepOne.meetingDurationStepOne / 60) *
          state.stepOne.laborEfficiencyStepOne)
    );
    const appointmentsPerWeekStepTwo = Math.floor(
      treatmentHoursPerWeekStepTwo /
        ((state.stepTwo.meetingDurationStepTwo / 60) *
          state.stepTwo.laborEfficiencyStepTwo)
    );

    // Unit maximum capacity for each treatment per week
    const maxWeeklyCapacityEj =
      state.ensijasennys.laborStepOne * appointmentsPerWeekEj;
    const maxWeeklyCapacityTau =
      state.tau.laborStepOne * appointmentsPerWeekTau;
    const maxWeeklyCapacityStepOne =
      state.stepOne.laborStepOne * appointmentsPerWeekStepOne;
    const maxWeeklyCapacityStepTwo =
      state.stepTwo.laborStepOne * appointmentsPerWeekStepTwo;

    // Unit maximum capacity for each treatment per six months
    const maxSixMonthsCapacityEj = maxWeeklyCapacityEj * 24;
    const maxSixMonthsCapacityTau = maxWeeklyCapacityTau * 24;
    const maxSixMonthsCapacityStepOne = maxWeeklyCapacityStepOne * 24;
    const maxSixMonthsCapacityStepTwo = maxWeeklyCapacityStepTwo * 24;

    // Patient flow
    cycleDuration = 6; // Simulation time cycle (months)

    const staff = [];

    const balance =
      patientInput +
      ensijasennys +
      hoitoonohjaus +
      tau +
      stepOne +
      stepTwo +
      muu;
    return balance;
  }
);

const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    value: 0,
    status: "idle",
  },
  extraReducers: {
    [calculateSimulationBalance.pending]: (state) => {
      state.status = "loading";
    },
    [calculateSimulationBalance.fulfilled]: (state, action) => {
      state.status = "idle";
      state.value = action.payload;
    },
  },
});

export default balanceSlice.reducer;
