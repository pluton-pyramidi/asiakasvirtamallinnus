import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialQueue: 200,
  newPatientsPerMonth: 10,
};

const startSlice = createSlice({
  name: "start",
  initialState,
  reducers: {
    setStart: (state, action) => {
      state.initialQueue = action.payload.initialQueue;
      state.newPatientsPerMonth = action.payload.newPatientsPerMonth;
    },
  },
});

export const { setStart } = startSlice.actions;
export default startSlice.reducer;
