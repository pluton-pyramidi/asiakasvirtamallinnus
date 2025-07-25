import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  calculateHoitoonohjausStepTwo,
  calculateInsufficencyRateStepOne,
  calculateStepOneToQueueRate,
} from "../input/stepOneSlice";
import { calculateInsufficencyRateStepTwo, calculateStepTwoToQueueRate } from "../input/stepTwoSlice";
import { calculateInsufficencyRateTau, calculateTauToQueueRate } from "../input/tauSlice";
import { calculateHoitoonohjausMuu } from "../input/hoitoonohjausSlice";
import { calculateInsufficencyRateMuu } from "../input/muuSlice";

// Thunk to calculate the simulation balance and return the result array for the graph
export const calculateSimulationBalance = createAsyncThunk(
  "balance/calculateSimulationBalance",
  async (_, { getState }) => {
    const state = getState();

    // ---------------------------------------
    // Simulation parameters
    // ---------------------------------------

    //// Get predefined simulation parameters from state
    // Assumed daily working hours of all professionals working in the unit
    const workingHoursDaily = state.simulationParams.workingHoursDaily;

    // Simulation time cycle (months)
    // This number is supposed to be the same as the length of the longest treatment duration
    const cycleDuration = state.simulationParams.cycleDuration;

    // Simulation duration (months)
    // How many months ahead the simulation models the queue status
    const simulationTimeSpan = state.simulationParams.simulationTimeSpan;

    // Treatment duration for TAU (months)
    const treatmentDurationTau = state.simulationParams.treatmentDurationTau;

    // Treatment duration for step one (months)
    const treatmentDurationStepOne = state.simulationParams.treatmentDurationStepOne;

    // Treatment duration for step two (months)
    const treatmentDurationStepTwo = state.simulationParams.treatmentDurationStepTwo;

    // How many hours each professional is allocated to produce this treatment per week
    // % of daily hours dedicated to this treatment * daily hours * 5 days a week
    const treatmentHoursPerWeekEj = state.ensijasennys.laborPercentageEnsijasennys * workingHoursDaily * 5;
    const treatmentHoursPerWeekTau = state.tau.laborPercentageTau * workingHoursDaily * 5;
    const treatmentHoursPerWeekStepOne = state.stepOne.laborPercentageStepOne * workingHoursDaily * 5;
    const treatmentHoursPerWeekStepTwo = state.stepTwo.laborPercentageStepTwo * workingHoursDaily * 5;

    // How many appointments each professional has per treatment per week (rounded down)
    // Hours professional does treatment per week / (meeting avg duration in hours * labor efficiency-%)
    const appointmentsPerWeekEj = Math.floor(
      (treatmentHoursPerWeekEj / (state.ensijasennys.meetingDurationEnsijasennys / 60)) *
        state.ensijasennys.laborEfficiencyEnsijasennys
    );
    const appointmentsPerWeekTau = Math.floor(
      (treatmentHoursPerWeekTau / (state.tau.meetingDurationTau / 60)) * state.tau.laborEfficiencyTau
    );
    const appointmentsPerWeekStepOne = Math.floor(
      (treatmentHoursPerWeekStepOne / (state.stepOne.meetingDurationStepOne / 60)) *
        state.stepOne.laborEfficiencyStepOne
    );
    const appointmentsPerWeekStepTwo = Math.floor(
      (treatmentHoursPerWeekStepTwo / (state.stepTwo.meetingDurationStepTwo / 60)) *
        state.stepTwo.laborEfficiencyStepTwo
    );

    // Unit maximum capacity for each treatment per week, aka. the number of patients that current staff can see in a week
    // Number of professionals * number of appointments per week
    const maxWeeklyCapacityEj = state.ensijasennys.laborEnsijasennys * appointmentsPerWeekEj;
    const maxWeeklyCapacityTau = state.tau.laborTau * appointmentsPerWeekTau;
    const maxWeeklyCapacityStepOne = state.stepOne.laborStepOne * appointmentsPerWeekStepOne;
    const maxWeeklyCapacityStepTwo = state.stepTwo.laborStepTwo * appointmentsPerWeekStepTwo;

    // Unit maximum capacity for each treatment per cycle aka. the number of patients that current staff can see in one "cycle"
    // Number of patients staff can see in a week * four weeks per month * number of months in a treatment cycle
    const maxCycleCapacityEj = maxWeeklyCapacityEj * 4 * cycleDuration;
    const maxCycleCapacityTau = maxWeeklyCapacityTau * 4 * (cycleDuration / treatmentDurationTau);
    const maxCycleCapacityStepOne = maxWeeklyCapacityStepOne * 4 * (cycleDuration / treatmentDurationStepOne);
    const maxCycleCapacityStepTwo = maxWeeklyCapacityStepTwo * 4 * (cycleDuration / treatmentDurationStepTwo);

    // Calculate the insufficiency rates for each treatment
    // aka. how many patients need further treatment after one treatment
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

    // KEY ASSUMPTION: Patients "leave queue" when they enter treatment (incl. Ensijäsennys)

    // Patient input to the simulation per cycle
    // No of patients in queue + new patients joining queue per month * cycle duration
    const newPatientsPerCycle = state.patientInput.newPatientsPerMonth * cycleDuration;
    const patientInputTotalPerCycle = state.patientInput.initialQueue + newPatientsPerCycle;

    // Patient input to Ensijäsennys per cycle
    // The maximum number of patients entering Ensijäsennys is equal to the max number of appointments staff can do
    // If the number of patients exceeds the max capacity, the number of patients entering Ensijäsennys is equal to the max capacity
    // "Leftover" patients remain in queue until the duration of Ensijäsennys has passed
    const patientInputPerCycleEj =
      patientInputTotalPerCycle > maxCycleCapacityEj ? maxCycleCapacityEj : patientInputTotalPerCycle;

    // Patient input to TAU per cycle
    // Input based on patient input to Ensijäsennys, referral rate to TAU, & current TAU capacity
    const patientInputPerCycleTau =
      patientInputPerCycleEj * state.hoitoonohjaus.hoitoonohjausTau > maxCycleCapacityTau
        ? maxCycleCapacityTau
        : patientInputPerCycleEj * state.hoitoonohjaus.hoitoonohjausTau;

    // Re-referral rates from TAU
    const patientReReferralsPerMonthTau = (patientInputPerCycleTau * insufficencyRateTau) / cycleDuration;
    const patientReReferralsPerMonthTauToMuu = patientReReferralsPerMonthTau * state.tau.tauToMuuRate;
    const patientFlowPerMonthTauToQueue = patientReReferralsPerMonthTau * tauToQueueRate;

    // Patient input to step one per cycle
    // Input based on patient flow from Ensijäsennys, and two referral rates: 1) to stepped care, and 2) to step one
    const patientInputPerCycleStepOne =
      patientInputPerCycleEj * state.hoitoonohjaus.hoitoonohjausSteppedCare * state.stepOne.hoitoonohjausStepOne >
      maxCycleCapacityStepOne
        ? maxCycleCapacityStepOne
        : patientInputPerCycleEj * state.hoitoonohjaus.hoitoonohjausSteppedCare * state.stepOne.hoitoonohjausStepOne;

    // Re-referral rates from step one
    const patientReReferralsPerMonthStepOne = (patientInputPerCycleStepOne * insufficencyRateStepOne) / cycleDuration;
    const patientReReferralsPerMonthStepOneToStepTwo =
      patientReReferralsPerMonthStepOne * state.stepOne.stepOneToStepTwoRate;
    const patientReReferralsPerMonthStepOneToMuu = patientReReferralsPerMonthStepOne * state.stepOne.stepOneToMuuRate;
    const patientFlowPerMonthStepOneToQueue = patientReReferralsPerMonthStepOne * stepOneToQueueRate;

    // Patient input to step two per cycle
    // Based on patient input, two referral rates and the re-referral rate from step one to step two
    const patientInputPerCycleStepTwo =
      patientInputPerCycleEj * state.hoitoonohjaus.hoitoonohjausSteppedCare * calculateHoitoonohjausStepTwo(state) +
        patientReReferralsPerMonthStepOneToStepTwo * cycleDuration >
      maxCycleCapacityStepTwo
        ? maxCycleCapacityStepTwo
        : patientInputPerCycleEj * state.hoitoonohjaus.hoitoonohjausSteppedCare * calculateHoitoonohjausStepTwo(state) +
          patientReReferralsPerMonthStepOneToStepTwo * cycleDuration;

    // Re-referral rates from step two
    const patientReReferralsPerMonthStepTwo = (patientInputPerCycleStepTwo * insufficencyRateStepTwo) / cycleDuration;
    const patientReReferralsPerMonthStepTwoToMuu = patientReReferralsPerMonthStepTwo * state.stepTwo.stepTwoToMuuRate;
    const patientFlowPerMonthStepTwoToQueue = patientReReferralsPerMonthStepTwo * stepTwoToQueueRate;

    // Patient input to Muu
    // Based on the patient input to Ensijäsennys, the referral rate to Muu, and re-referrals from the other treatments
    const patientInputPerCycleMuu =
      patientInputPerCycleEj * calculateHoitoonohjausMuu(state) +
      (patientReReferralsPerMonthTauToMuu +
        patientReReferralsPerMonthStepOneToMuu +
        patientReReferralsPerMonthStepTwoToMuu) *
        cycleDuration;

    // Patient flow from Muu to queue
    const patientFlowPerMonthMuuToQueue = (patientInputPerCycleMuu * insufficencyRateMuu) / cycleDuration;

    // Capacity utilization rate for each treatment
    const capacityUtilizationRateEj = Math.round((patientInputPerCycleEj / maxCycleCapacityEj) * 100);
    const capacityUtilizationRateTau = Math.round((patientInputPerCycleTau / maxCycleCapacityTau) * 100);
    const capacityUtilizationRateStepOne = Math.round((patientInputPerCycleStepOne / maxCycleCapacityStepOne) * 100);
    const capacityUtilizationRateStepTwo = Math.round((patientInputPerCycleStepTwo / maxCycleCapacityStepTwo) * 100);

    // Define capacity status for each treatment (0 = Ei potilaita ohjattuna tänne, 1 = Resurssit riittävät, 2 = Resurssit eivät riitä)
    // ATTN! This should probably be stored in global store, but for now it's here until I get the simulation up and running
    const capacityStatusEj =
      capacityUtilizationRateEj > 100
        ? "Resurssit eivät riitä: potilaita tulossa tänne enemmän kuin ammattilaiset ehtivät viikossa tavassa"
        : capacityUtilizationRateEj === 0
        ? "Ei potilaita ohjattuna tänne"
        : "Resurssit riittävät: kaikille tänne tuleville potilaille löytyy ammattilainen tapaamaan heitä kerran viikossa";
    const capacityStatusTau =
      capacityUtilizationRateTau > 100
        ? "Resurssit eivät riitä: potilaita tulossa tänne enemmän kuin ammattilaiset ehtivät viikossa tavassa"
        : capacityUtilizationRateTau === 0
        ? "Ei potilaita ohjattuna tänne"
        : "Resurssit riittävät: kaikille tänne tuleville potilaille löytyy ammattilainen tapaamaan heitä kerran viikossa";
    const capacityStatusStepOne =
      capacityUtilizationRateStepOne > 100
        ? "Resurssit eivät riitä: potilaita tulossa tänne enemmän kuin ammattilaiset ehtivät viikossa tavassa"
        : capacityUtilizationRateStepOne === 0
        ? "Ei potilaita ohjattuna tänne"
        : "Resurssit riittävät: kaikille tänne tuleville potilaille löytyy ammattilainen tapaamaan heitä kerran viikossa";
    const capacityStatusStepTwo =
      capacityUtilizationRateStepTwo > 100
        ? "Resurssit eivät riitä: potilaita tulossa tänne enemmän kuin ammattilaiset ehtivät viikossa tavassa"
        : capacityUtilizationRateStepTwo === 0
        ? "Ei potilaita ohjattuna tänne"
        : "Resurssit riittävät: kaikille tänne tuleville potilaille löytyy ammattilainen tapaamaan heitä kerran viikossa";

    // ---------------------------------------
    // Simulation balance
    // ---------------------------------------

    // Time array
    const timeArray = Array.from({ length: simulationTimeSpan }, (_, i) => i + 1);

    //// Monthly balance IN
    // Patients returning to queue (cumulative arrays of patients joining queue/returning to queue from each treatment)
    const balanceIn = {
      newPatientsJoiningQueue: [],
      patientsReturningFromTau: [],
      patientsReturningFromStepOne: [],
      patientsReturningFromStepTwo: [],
      patientsReturningFromMuu: [],
      patientsJoiningTotal: [],
    };

    timeArray.forEach((_, i) => {
      const newPatientsJoiningQueue = Math.round(state.patientInput.newPatientsPerMonth * (i + 1));
      const patientsReturningFromTau = Math.round(patientFlowPerMonthTauToQueue * (i + 1));
      const patientsReturningFromStepOne = Math.round(patientFlowPerMonthStepOneToQueue * (i + 1));
      const patientsReturningFromStepTwo = Math.round(patientFlowPerMonthStepTwoToQueue * (i + 1));
      const patientsReturningFromMuu = Math.round(patientFlowPerMonthMuuToQueue * (i + 1));

      const total =
        newPatientsJoiningQueue +
        patientsReturningFromTau +
        patientsReturningFromStepOne +
        patientsReturningFromStepTwo +
        patientsReturningFromMuu;

      balanceIn.newPatientsJoiningQueue.push(newPatientsJoiningQueue);
      balanceIn.patientsReturningFromTau.push(patientsReturningFromTau);
      balanceIn.patientsReturningFromStepOne.push(patientsReturningFromStepOne);
      balanceIn.patientsReturningFromStepTwo.push(patientsReturningFromStepTwo);
      balanceIn.patientsReturningFromMuu.push(patientsReturningFromMuu);
      balanceIn.patientsJoiningTotal.push(total);
    });

    //// Monthly balance OUT
    // Patients leaving the queue (cumulative arrays of patients leaving queue upon entering a treatment)
    // Key assumption: Patients leave queue when they enter a treatment
    const balanceOut = {
      patientsLeavingFromTau: [],
      patientsLeavingFromStepOne: [],
      patientsLeavingFromStepTwo: [],
      patientsLeavingFromMuu: [],
      patientsLeavingTotal: [],
    };

    timeArray.forEach((_, i) => {
      const patientsLeavingFromTau = Math.round((patientInputPerCycleTau / cycleDuration) * (i + 1));
      const patientsLeavingFromStepOne = Math.round((patientInputPerCycleStepOne / cycleDuration) * (i + 1));
      const patientsLeavingFromStepTwo = Math.round((patientInputPerCycleStepTwo / cycleDuration) * (i + 1));
      const patientsLeavingFromMuu = Math.round((patientInputPerCycleMuu / cycleDuration) * (i + 1));

      const total =
        patientsLeavingFromTau + patientsLeavingFromStepOne + patientsLeavingFromStepTwo + patientsLeavingFromMuu;

      balanceOut.patientsLeavingFromTau.push(patientsLeavingFromTau);
      balanceOut.patientsLeavingFromStepOne.push(patientsLeavingFromStepOne);
      balanceOut.patientsLeavingFromStepTwo.push(patientsLeavingFromStepTwo);
      balanceOut.patientsLeavingFromMuu.push(patientsLeavingFromMuu);
      balanceOut.patientsLeavingTotal.push(total);
    });

    // Monthly cumulative balance array
    const balanceArray = [];

    timeArray.forEach((_, i) => {
      const patientsJoining = balanceIn.patientsJoiningTotal[i];
      const patientsLeaving = balanceOut.patientsLeavingTotal[i];
      balanceArray.push(patientsJoining - patientsLeaving);
    });

    // The final product: simulated queue array
    // First value is the initial queue value
    // Subsequent months are calculated based on the cumulative balance added to the first value
    const simulatedQueueArray = [];
    for (let i = 0; i < simulationTimeSpan; i++) {
      if (i === 0) {
        // First month balance
        simulatedQueueArray[i] = Math.max(
          0,
          Math.round(state.patientInput.initialQueue + state.patientInput.newPatientsPerMonth)
        );
      } else {
        // Subsequent months balance
        simulatedQueueArray[i] = Math.max(0, Math.round(simulatedQueueArray[i - 1] + balanceArray[i - 1]));
      }
    }

    // Results table for visual debugging/inspection of the simulation internal logic
    const resultsTable = [
      { name: "Working Hours Daily:", value: workingHoursDaily },
      { name: "Cycle Duration (months):", value: cycleDuration },
      { name: "Simulation Duration (months):", value: simulationTimeSpan },
      // Patient Input Per Cycle
      { name: "Patient Input Per Cycle (Total):", value: patientInputTotalPerCycle },
      { name: "", value: "-----------------Ensijäsennys-----------------" },
      { name: "Patient Input Per Cycle (Ensijäsennys):", value: patientInputPerCycleEj },
      { name: "Treatment Hours Per Week (Ensijäsennys):", value: treatmentHoursPerWeekEj },
      { name: "Appointments Per Week (Ensijäsennys):", value: appointmentsPerWeekEj },
      { name: "Max Weekly Capacity (Ensijäsennys):", value: maxWeeklyCapacityEj },
      { name: "Max Cycle Capacity (Ensijäsennys):", value: maxCycleCapacityEj },
      { name: "Capacity Utilization Rate (%) (Ensijäsennys):", value: capacityUtilizationRateEj },
      { name: "Capacity Status (Ensijäsennys):", value: capacityStatusEj },
      { name: "", value: "-----------------TAU-----------------" },
      { name: "Patient Input Per Cycle (TAU):", value: patientInputPerCycleTau },
      { name: "Treatment Hours Per Week (TAU):", value: treatmentHoursPerWeekTau },
      { name: "Appointments Per Week (TAU):", value: appointmentsPerWeekTau },
      { name: "Max Weekly Capacity (TAU):", value: maxWeeklyCapacityTau },
      { name: "Max Cycle Capacity (TAU):", value: maxCycleCapacityTau },
      { name: "Capacity Utilization Rate (%) (TAU):", value: capacityUtilizationRateTau },
      { name: "Capacity Status (TAU):", value: capacityStatusTau },
      { name: "", value: "-----------------Step One-----------------" },
      { name: "Patient Input Per Cycle (Step One):", value: patientInputPerCycleStepOne },
      { name: "Treatment Hours Per Week (Step One):", value: treatmentHoursPerWeekStepOne },
      { name: "Appointments Per Week (Step One):", value: appointmentsPerWeekStepOne },
      { name: "Max Weekly Capacity (Step One):", value: maxWeeklyCapacityStepOne },
      { name: "Max Cycle Capacity (Step One):", value: maxCycleCapacityStepOne },
      { name: "Capacity Utilization Rate (%) (Step One):", value: capacityUtilizationRateStepOne },
      { name: "Capacity Status (Step One):", value: capacityStatusStepOne },
      { name: "", value: "-----------------Step Two-----------------" },
      { name: "Patient Input Per Cycle (Step Two):", value: patientInputPerCycleStepTwo },
      { name: "Treatment Hours Per Week (Step Two):", value: treatmentHoursPerWeekStepTwo },
      { name: "Appointments Per Week (Step Two):", value: appointmentsPerWeekStepTwo },
      { name: "Max Weekly Capacity (Step Two):", value: maxWeeklyCapacityStepTwo },
      { name: "Max Cycle Capacity (Step Two):", value: maxCycleCapacityStepTwo },
      { name: "Capacity Utilization Rate (%) (Step Two):", value: capacityUtilizationRateStepTwo },
      { name: "Capacity Status (Step Two):", value: capacityStatusStepTwo },
    ];

    // Store all calculated values by treatment unit
    const simulationValues = {
      workingHoursDaily,
      cycleDuration,
      simulationTimeSpan,
      treatmentDurationTau,
      treatmentDurationStepOne,
      treatmentDurationStepTwo,
      treatmentHoursPerWeekEj,
      treatmentHoursPerWeekTau,
      treatmentHoursPerWeekStepOne,
      treatmentHoursPerWeekStepTwo,
      appointmentsPerWeekEj,
      appointmentsPerWeekTau,
      appointmentsPerWeekStepOne,
      appointmentsPerWeekStepTwo,
      maxWeeklyCapacityEj,
      maxWeeklyCapacityTau,
      maxWeeklyCapacityStepOne,
      maxWeeklyCapacityStepTwo,
      maxCycleCapacityEj,
      maxCycleCapacityTau,
      maxCycleCapacityStepOne,
      maxCycleCapacityStepTwo,
      insufficencyRateTau,
      insufficencyRateStepOne,
      insufficencyRateStepTwo,
      insufficencyRateMuu,
      tauToQueueRate,
      stepOneToQueueRate,
      stepTwoToQueueRate,
    };

    // Return the final simulation product array
    // This array is used to render the simulation graph in the UI
    return {
      simulatedQueueArray,
      resultsTable,
      balanceIn,
      balanceOut,
      simulationValues,
    };
  }
);

// Slice to manage the simulation balance state
const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    queueArray: [], // Initialize simulated queue array
    resultsTable: [], // Initialize results table
    balanceIn: {}, // Init balance in arrays object
    balanceOut: {}, // Init balance out arrays object
    simulationValues: {}, // Holds all values of the simulation
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
        state.queueArray = action.payload.simulatedQueueArray; // Store the simulated queue array
        state.resultsTable = action.payload.resultsTable; // Store the results table
        state.balanceIn = action.payload.balanceIn; // Store the balance in arrays object
        state.balanceOut = action.payload.balanceOut; // Store the balance out arrays object
        state.simulationValues = action.payload.simulationValues; // Store the simulation values
      })
      .addCase(calculateSimulationBalance.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default balanceSlice.reducer;
