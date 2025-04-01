import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { calculateHoitoonohjausStepTwo } from "./stepOneSlice";
import {
  calculateInsufficencyRateStepOne,
  calculateStepOneToQueueRate,
} from "./stepOneSlice";
import {
  calculateInsufficencyRateStepTwo,
  calculateStepTwoToQueueRate,
} from "./stepTwoSlice";
import {
  calculateInsufficencyRateTau,
  calculateTauToQueueRate,
} from "./tauSlice";

// Thunk to calculate the simulation balance and return the result
export const calculateSimulationBalance = createAsyncThunk(
  "balance/calculateSimulationBalance",
  async (_, { getState }) => {
    const state = getState();

    // These numbers I might have to move to global store and let the user define them
    const workingHoursDaily = 7.5; // Assumed daily working hours
    const cycleDuration = 6; // Simulation time cycle (months)
    const treatmentDurationTau = 6; // Treatment duration for TAU (months)
    const treatmentDurationStepOne = 1; // Treatment duration for step one (months)
    const treatmentDurationStepTwo = 3; // Treatment duration for step two (months)

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

    // Unit maximum capacity for each treatment per cycle
    const maxCycleCapacityEj = maxWeeklyCapacityEj * 4 * cycleDuration;
    const maxCycleCapacityTau = maxWeeklyCapacityTau * 4 * cycleDuration;
    const maxCycleCapacityStepOne =
      maxWeeklyCapacityStepOne * 4 * cycleDuration;
    const maxCycleCapacityStepTwo =
      maxWeeklyCapacityStepTwo * 4 * cycleDuration;

    // Patient input to the simulation
    const newPatientsPerCycle =
      state.patientInput.newPatientsPerMonth * cycleDuration;
    const patientInputTotal =
      state.patientInput.initialQueue + newPatientsPerCycle;

    // Patient input to the simulation for each treatment
    const capacityUtilizationEj =
      (patientInputTotal / maxCycleCapacityEj) * 100;
    const capacityUtilizationTau =
      ((patientInputTotal * state.hoitoonohjaus.hoitoonohjausTau) /
        maxCycleCapacityTau) *
      100;
    const capacityUtilizationStepOne =
      ((patientInputTotal *
        state.hoitoonohjaus.hoitoonohjausSteppedCare *
        state.stepOne.hoitoonohjaus) /
        maxCycleCapacityStepOne) *
      100;
    const capacityUtilizationStepTwo =
      ((patientInputTotal *
        state.hoitoonohjaus.hoitoonohjausSteppedCare *
        calculateHoitoonohjausStepTwo(state)) /
        maxCycleCapacityStepTwo) *
      100;

    // Define capacity status for each treatment
    const capacityStatusEj =
      capacityUtilizationEj > 100
        ? "Resurssit eivät riitä"
        : capacityUtilizationEj === 0
        ? "Ei potilaita ohjattuna tänne"
        : "Resurssit riittävät";
    const capacityStatusTau =
      capacityUtilizationTau > 100
        ? "Resurssit eivät riitä"
        : capacityUtilizationTau === 0
        ? "Ei potilaita ohjattuna tänne"
        : "Resurssit riittävät";
    const capacityStatusStepOne =
      capacityUtilizationStepOne > 100
        ? "Resurssit eivät riitä"
        : capacityUtilizationStepOne === 0
        ? "Ei potilaita ohjattuna tänne"
        : "Resurssit riittävät";
    const capacityStatusStepTwo =
      capacityUtilizationStepTwo > 100
        ? "Resurssit eivät riitä"
        : capacityUtilizationStepTwo === 0
        ? "Ei potilaita ohjattuna tänne"
        : "Resurssit riittävät";

    // Calculate the insufficiency rate for each treatment
    // Virtaus portaalta toiselle pitää huomida jo potilassisäänvirtausten laskuissa yllä

    const balance = 0;
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
