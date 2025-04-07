import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  calculateHoitoonohjausStepTwo,
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
import { calculateHoitoonohjausMuu } from "./hoitoonohjausSlice";
import { calculateInsufficencyRateMuu } from "../input/muuSlice";

// Thunk to calculate the simulation balance and return the result array for the graph
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

    // ---------------------------------------
    // Simulation parameters
    // ---------------------------------------

    // How many hours each professional is assigned to produce this treatment per week
    const treatmentHoursPerWeekEj =
      state.ensijasennys.laborPercentageEnsijasennys * workingHoursDaily * 5;
    const treatmentHoursPerWeekTau =
      state.tau.laborPercentageTau * workingHoursDaily * 5;
    const treatmentHoursPerWeekStepOne =
      state.stepOne.laborPercentageStepOne * workingHoursDaily * 5;
    const treatmentHoursPerWeekStepTwo =
      state.stepTwo.laborPercentageStepTwo * workingHoursDaily * 5;

    // How many appointments each professional has per treatment per week (rounded down)
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
    // aka. the number of appointments that current staff can do in a week
    const maxWeeklyCapacityEj =
      state.ensijasennys.laborStepOne * appointmentsPerWeekEj;
    const maxWeeklyCapacityTau =
      state.tau.laborStepOne * appointmentsPerWeekTau;
    const maxWeeklyCapacityStepOne =
      state.stepOne.laborStepOne * appointmentsPerWeekStepOne;
    const maxWeeklyCapacityStepTwo =
      state.stepTwo.laborStepOne * appointmentsPerWeekStepTwo;

    // Unit maximum capacity for each treatment per cycle
    // aka. the number of appointments that current staff can do in one cycle
    const maxCycleCapacityEj = maxWeeklyCapacityEj * 4 * cycleDuration;
    const maxCycleCapacityTau = maxWeeklyCapacityTau * 4 * cycleDuration;
    const maxCycleCapacityStepOne =
      maxWeeklyCapacityStepOne * 4 * cycleDuration;
    const maxCycleCapacityStepTwo =
      maxWeeklyCapacityStepTwo * 4 * cycleDuration;

    // Calculate the insufficiency rates for each treatment
    // aka. how many patients need further treatment
    // (the functions are defined in corresponding state slices)
    const insufficencyRateTau = calculateInsufficencyRateTau(state);
    const insufficencyRateStepOne = calculateInsufficencyRateStepOne(state);
    const insufficencyRateStepTwo = calculateInsufficencyRateStepTwo(state);
    const insufficencyRateMuu = calculateInsufficencyRateMuu(state);

    // Calculate the rate of patients returning to queue after treatment
    // aka. % of patients who aren't re-referred for further treatment, but then return to queue seeking for more help (tends to happen in real life)
    const tauToQueueRate = calculateTauToQueueRate(state);
    const stepOneToQueueRate = calculateStepOneToQueueRate(state);
    const stepTwoToQueueRate = calculateStepTwoToQueueRate(state);

    // ---------------------------------------
    // Simulation business logic
    // ---------------------------------------

    // Patient input to the simulation per cycle
    const newPatientsPerCycle =
      state.patientInput.newPatientsPerMonth * cycleDuration;
    const patientInputTotalPerCycle =
      state.patientInput.initialQueue + newPatientsPerCycle;

    // Patient input to Ensijäsennys per cycle
    const patientInputPerCycleEj =
      patientInputTotalPerCycle > maxCycleCapacityEj
        ? maxCycleCapacityEj
        : patientInputTotalPerCycle;

    // Patient input to TAU per cycle
    // Input based on patient input to Ensijäsennys, referral rate to TAU, & current TAU capacity
    const patientInputPerCycleTau =
      patientInputPerCycleEj * state.hoitoonohjaus.hoitoonohjausTau >
      maxCycleCapacityTau
        ? maxCycleCapacityTau
        : patientInputPerCycleEj * state.hoitoonohjaus.hoitoonohjausTau;

    // Re-referral rates from TAU
    const patientReReferralsPerMonthTau =
      (patientInputPerCycleTau * insufficencyRateTau) / cycleDuration;
    const patientReReferralsPerMonthTauToMuu =
      patientReReferralsPerMonthTau * state.tau.tauToMuuRate;
    const patientFlowPerMonthTauToQueue =
      patientReReferralsPerMonthTau * tauToQueueRate;

    // Patient input to step one per cycle
    // Input based on patient flow from Ensijäsennys, and two referral rates: 1) to stepped care, and 2) to step one
    const patientInputPerCycleStepOne =
      patientInputPerCycleEj *
        state.hoitoonohjaus.hoitoonohjausSteppedCare *
        state.stepOne.hoitoonohjaus >
      maxCycleCapacityStepOne
        ? maxCycleCapacityStepOne
        : patientInputPerCycleEj *
          state.hoitoonohjaus.hoitoonohjausSteppedCare *
          state.stepOne.hoitoonohjaus;

    // Re-referral rates from step one
    const patientReReferralsPerMonthStepOne =
      (patientInputPerCycleStepOne * insufficencyRateStepOne) / cycleDuration;
    const patientReReferralsPerMonthStepOneToStepTwo =
      patientReReferralsPerMonthStepOne * state.stepOne.stepOneToStepTwoRate;
    const patientReReferralsPerMonthStepOneToMuu =
      patientReReferralsPerMonthStepOne * state.stepOne.stepOneToMuuRate;
    const patientFlowPerMonthStepOneToQueue =
      patientReReferralsPerMonthStepOne * stepOneToQueueRate;

    // Patient input to step two
    // Based on patient input, two referral rates and the re-referral rate from step one to step two
    const patientInputPerCycleStepTwo =
      patientInputPerCycleEj *
        state.hoitoonohjaus.hoitoonohjausSteppedCare *
        calculateHoitoonohjausStepTwo(state) +
        patientReReferralsPerMonthStepOneToStepTwo * cycleDuration >
      maxCycleCapacityStepTwo
        ? maxCycleCapacityStepTwo
        : patientInputPerCycleEj *
            state.hoitoonohjaus.hoitoonohjausSteppedCare *
            calculateHoitoonohjausStepTwo(state) +
          patientReReferralsPerMonthStepOneToStepTwo * cycleDuration;

    // Re-referral rates from step two
    const patientReReferralsPerMonthStepTwo =
      (patientInputPerCycleStepTwo * insufficencyRateStepTwo) / cycleDuration;
    const patientReReferralsPerMonthStepTwoToMuu =
      patientReReferralsPerMonthStepTwo * state.stepTwo.stepTwoToMuuRate;
    const patientFlowPerMonthStepTwoToQueue =
      patientReReferralsPerMonthStepTwo * stepTwoToQueueRate;

    // Patient input to Muu
    // Calculated based on the patient input to Ensijäsennys and the referral rate to Muu
    const patientInputPerCycleMuu =
      patientInputPerCycleEj * calculateHoitoonohjausMuu(state) +
      (patientReReferralsPerMonthTauToMuu +
        patientReReferralsPerMonthStepOneToMuu +
        patientReReferralsPerMonthStepTwoToMuu) *
        cycleDuration;

    // Patient flow from Muu to queue
    const patientFlowPerMonthMuuToQueue =
      (patientInputPerCycleMuu * insufficencyRateMuu) / cycleDuration;

    // Capacity utilization rate for each treatment
    const capacityUtilizationRateEj =
      (patientInputPerCycleEj / maxCycleCapacityEj) * 100;
    const capacityUtilizationRateTau =
      (patientInputPerCycleTau / maxCycleCapacityTau) * 100;
    const capacityUtilizationRateStepOne =
      (patientInputPerCycleStepOne / maxCycleCapacityStepOne) * 100;
    const capacityUtilizationRateStepTwo =
      (patientInputPerCycleStepTwo / maxCycleCapacityStepTwo) * 100;

    // Define capacity status for each treatment (0 = Ei potilaita ohjattuna tänne, 1 = Resurssit riittävät, 2 = Resurssit eivät riitä)
    // ATTN! This should probably be stored in global store, but for now it's here for simplicity
    const capacityStatusEj =
      capacityUtilizationRateEj > 100
        ? 2
        : capacityUtilizationRateEj === 0
        ? 0
        : 1;
    const capacityStatusTau =
      capacityUtilizationRateTau > 100
        ? 2
        : capacityUtilizationRateTau === 0
        ? 0
        : 1;
    const capacityStatusStepOne =
      capacityUtilizationRateStepOne > 100
        ? 2
        : capacityUtilizationRateStepOne === 0
        ? 0
        : 1;
    const capacityStatusStepTwo =
      capacityUtilizationRateStepTwo > 100
        ? 2
        : capacityUtilizationRateStepTwo === 0
        ? 0
        : 1;

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
