import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Thunk to calculate the simulation balance and return the result
export const calculateSimulationBalance = createAsyncThunk(
  "balance/calculateSimulationBalance",
  async (_, { getState }) => {
    const state = getState();

    const staff = [];

    const start = state.start.value;
    const ensijasennys = state.ensijasennys.value;
    const hoitoonohjaus = state.hoitoonohjaus.value;
    const tau = state.tau.value;
    const stepOne = state.stepOne.value;
    const stepTwo = state.stepTwo.value;
    const muu = state.muu.value;
    const balance =
      start + ensijasennys + hoitoonohjaus + tau + stepOne + stepTwo + muu;
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
