import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  calculateHoitoonohjausStepTwo,
  calculateInsufficencyRateStepOne,
  calculateStepOneToQueueRate,
} from "../input/stepOneSlice";
import {
  calculateInsufficencyRateStepTwo,
  calculateStepTwoToQueueRate,
} from "../input/stepTwoSlice";
import {
  calculateInsufficencyRateTau,
  calculateTauToQueueRate,
} from "../input/tauSlice";
import { calculateHoitoonohjausMuu } from "../input/hoitoonohjausSlice";
import { calculateInsufficencyRateMuu } from "../input/muuSlice";

// Thunk to calculate the simulation balance and return the result array for the graph
export const calculateSimulationBalance = createAsyncThunk(
  "balance/calculateSimulationBalance",
  async (_, { getState }) => {
    const state = getState();

    // These numbers I might have to move to global store and let the user define them
    const workingHoursDaily = 7.5; // Assumed daily working hours
    const cycleDuration = 6; // Simulation time cycle (months)
    const simulationDuration = 24; // Simulation duration (months)
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
    // ATTN! This should probably be stored in global store, but for now it's here until I get the simulation up and running
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

    // ---------------------------------------
    // Simulation balance
    // ---------------------------------------

    // Time array
    const timeArray = Array.from(
      { length: simulationDuration },
      (_, i) => i + 1
    );

    //// Monthly balance IN
    // Patients returning to queue (an array with the sum of all patients returning to queue from each treatment)
    const balanceInPatientsJoiningQueue = timeArray.map((_, i) => {
      // New patients joining queue each month
      const newPatientsJoiningQueue =
        state.patientInput.newPatientsPerMonth * (i + 1);
      // Patients returning from TAU to queue
      const patientsReturningFromTau = patientFlowPerMonthTauToQueue * (i + 1);
      // Patients returning from step one to queue
      const patientsReturningFromStepOne =
        patientFlowPerMonthStepOneToQueue * (i + 1);
      // Patients returning from step two to queue
      const patientsReturningFromStepTwo =
        patientFlowPerMonthStepTwoToQueue * (i + 1);
      // Patients returning from Muu to queue
      const patientsReturningFromMuu = patientFlowPerMonthMuuToQueue * (i + 1);

      return (
        newPatientsJoiningQueue +
        patientsReturningFromTau +
        patientsReturningFromStepOne +
        patientsReturningFromStepTwo +
        patientsReturningFromMuu
      );
    });

    //// Monthly balance OUT
    // Patients leaving the queue (an array with the sum of all patients leaving the queue from each treatment)
    // Key assumption: Patients leave queue when they enter treatment
    const balanceOutPatientsLeavingQueue = timeArray.map((_, i) => {
      // Patients leaving from TAU
      const patientsLeavingFromTau =
        (patientInputPerCycleTau / cycleDuration) * (i + 1);
      // Patients leaving from step one
      const patientsLeavingFromStepOne =
        (patientInputPerCycleStepOne / cycleDuration) * (i + 1);
      // Patients leaving from step two
      const patientsLeavingFromStepTwo =
        (patientInputPerCycleStepTwo / cycleDuration) * (i + 1);
      // Patients leaving from Muu
      const patientsLeavingFromMuu =
        (patientInputPerCycleMuu / cycleDuration) * (i + 1);

      return (
        patientsLeavingFromTau +
        patientsLeavingFromStepOne +
        patientsLeavingFromStepTwo +
        patientsLeavingFromMuu
      );
    });

    // Monthly balance array
    const balanceArray = timeArray.map((_, i) => {
      const patientsJoining = balanceInPatientsJoiningQueue[i];
      const patientsLeaving = balanceOutPatientsLeavingQueue[i];
      return patientsJoining - patientsLeaving; // Net balance for each month
    });

    // The final product: simulated queue array
    // First month begins with the initial queue value and the first month's balance
    // (i.e. initial queue + first month's balance)
    // Subsequent months are calculated based on the previous month's balance
    const simulatedQueueArray = [];
    for (let i = 0; i < simulationDuration; i++) {
      if (i === 0) {
        // First month balance
        simulatedQueueArray[i] =
          state.patientInput.initialQueue + balanceArray[i];
      } else {
        // Subsequent months balance
        simulatedQueueArray[i] = simulatedQueueArray[i - 1] + balanceArray[i];
      }
    }
    // Results table for visual inspection of the simulation internal logic
    const resultsTable = [
      { name: "Working Hours Daily", value: workingHoursDaily },
      { name: "Cycle Duration (months)", value: cycleDuration },
      { name: "Simulation Duration (months)", value: simulationDuration },

      // Treatment Hours Per Week
      {
        name: "Treatment Hours Per Week (Ensijäsennys)",
        value: treatmentHoursPerWeekEj,
      },
      {
        name: "Treatment Hours Per Week (TAU)",
        value: treatmentHoursPerWeekTau,
      },
      {
        name: "Treatment Hours Per Week (Step One)",
        value: treatmentHoursPerWeekStepOne,
      },
      {
        name: "Treatment Hours Per Week (Step Two)",
        value: treatmentHoursPerWeekStepTwo,
      },

      // Appointments Per Week
      {
        name: "Appointments Per Week (Ensijäsennys)",
        value: appointmentsPerWeekEj,
      },
      { name: "Appointments Per Week (TAU)", value: appointmentsPerWeekTau },
      {
        name: "Appointments Per Week (Step One)",
        value: appointmentsPerWeekStepOne,
      },
      {
        name: "Appointments Per Week (Step Two)",
        value: appointmentsPerWeekStepTwo,
      },

      // Max Weekly Capacity
      {
        name: "Max Weekly Capacity (Ensijäsennys)",
        value: maxWeeklyCapacityEj,
      },
      { name: "Max Weekly Capacity (TAU)", value: maxWeeklyCapacityTau },
      {
        name: "Max Weekly Capacity (Step One)",
        value: maxWeeklyCapacityStepOne,
      },
      {
        name: "Max Weekly Capacity (Step Two)",
        value: maxWeeklyCapacityStepTwo,
      },

      // Max Cycle Capacity
      { name: "Max Cycle Capacity (Ensijäsennys)", value: maxCycleCapacityEj },
      { name: "Max Cycle Capacity (TAU)", value: maxCycleCapacityTau },
      { name: "Max Cycle Capacity (Step One)", value: maxCycleCapacityStepOne },
      { name: "Max Cycle Capacity (Step Two)", value: maxCycleCapacityStepTwo },

      // Insufficiency Rates
      { name: "Insufficiency Rate (TAU)", value: insufficencyRateTau },
      { name: "Insufficiency Rate (Step One)", value: insufficencyRateStepOne },
      { name: "Insufficiency Rate (Step Two)", value: insufficencyRateStepTwo },
      {
        name: "Insufficiency Rate (Ensijäsennys)",
        value: state.ensijasennys.insufficencyRateEnsijäsennys,
      },
      {
        name: "Insufficiency Rate (Muu)",
        value: state.muu.insufficencyRateMuu,
      },

      // Patients Returning to Queue
      {
        name: "Patients Returning to Queue (TAU)",
        value: patientFlowPerMonthTauToQueue,
      },
      {
        name: "Patients Returning to Queue (Step One)",
        value: patientFlowPerMonthStepOneToQueue,
      },
      {
        name: "Patients Returning to Queue (Step Two)",
        value: patientFlowPerMonthStepTwoToQueue,
      },
      {
        name: "Patients Returning to Queue (Muu)",
        value: patientFlowPerMonthMuuToQueue,
      },
      {
        name: "Patients Returning to Queue (Ensijäsennys)",
        value: patientFlowPerMonthStepOneToQueue,
      },

      // Patient Input Per Cycle
      {
        name: "Patient Input Per Cycle (Ensijäsennys)",
        value: patientInputPerCycleEj,
      },
      { name: "Patient Input Per Cycle (TAU)", value: patientInputPerCycleTau },
      {
        name: "Patient Input Per Cycle (Step One)",
        value: patientInputPerCycleStepOne,
      },
      {
        name: "Patient Input Per Cycle (Step Two)",
        value: patientInputPerCycleStepTwo,
      },
      { name: "Patient Input Per Cycle (Muu)", value: patientInputPerCycleMuu },

      // Capacity Utilization Rates
      {
        name: "Capacity Utilization Rate (Ensijäsennys)",
        value: capacityUtilizationRateEj,
      },
      {
        name: "Capacity Utilization Rate (TAU)",
        value: capacityUtilizationRateTau,
      },
      {
        name: "Capacity Utilization Rate (Step One)",
        value: capacityUtilizationRateStepOne,
      },
      {
        name: "Capacity Utilization Rate (Step Two)",
        value: capacityUtilizationRateStepTwo,
      },
      {
        name: "Capacity Utilization Rate (Muu)",
        value: capacityUtilizationRateEj,
      },

      // Capacity Status
      { name: "Capacity Status (Ensijäsennys)", value: capacityStatusEj },
      { name: "Capacity Status (TAU)", value: capacityStatusTau },
      { name: "Capacity Status (Step One)", value: capacityStatusStepOne },
      { name: "Capacity Status (Step Two)", value: capacityStatusStepTwo },
      { name: "Capacity Status (Muu)", value: capacityStatusEj },
    ];

    // Return the final simulation product array
    // This array is used to render the simulation graph in the UI
    return { simulatedQueueArray, resultsTable };
  }
);

// Slice to manage the simulation balance state
const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    value: [], // Stores the simulated queue array
    resultsTable: [], // Stores the results table
    status: "idle", // Tracks the status of the thunk (loading, idle, etc.)
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(calculateSimulationBalance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(calculateSimulationBalance.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload.simulatedQueueArray; // Store the simulated queue array
        state.resultsTable = action.payload.resultsTable; // Store the results table
      })
      .addCase(calculateSimulationBalance.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default balanceSlice.reducer;
