import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hoitoonohjausStepOne: 0.5,
  laborStepOne: 5,
  laborPercentageStepOne: 0.5,
};

const stepOneSlice = createSlice({
  name: "stepOne",
  initialState,
  reducers: {
    setStepOne: (state, action) => {
      state.hoitoonohjausStepOne = action.payload.hoitoonohjausStepOne;
      state.laborStepOne = action.payload.laborStepOne;
      state.laborPercentageStepOne = action.payload.laborPercentageStepOne;
    },
  },
});

export const { setStepOne } = stepOneSlice.actions;
export default stepOneSlice.reducer;
