import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialQueue: 200,
  newPatientsPerMonth: 10,
};

const patientInputSlice = createSlice({
  name: "patientInput",
  initialState,
  reducers: {
    setPatientInput: (state, action) => {
      state.initialQueue = action.payload.initialQueue;
      state.newPatientsPerMonth = action.payload.newPatientsPerMonth;
    },
  },
});

export const { setPatientInput } = patientInputSlice.actions;
export default patientInputSlice.reducer;
