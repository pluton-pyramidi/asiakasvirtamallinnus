import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  laborStepTwo: 5,
  laborPercentageStepTwo: 0.5,
};

const stepTwoSlice = createSlice({
  name: "stepTwo",
  initialState,
  reducers: {
    setStepTwo: (state, action) => {
      state.laborStepTwo = action.payload.laborStepTwo;
      state.laborPercentageStepTwo = action.payload.laborPercentageStepTwo;
    },
  },
});

export const { setStepTwo } = stepTwoSlice.actions;
export default stepTwoSlice.reducer;
