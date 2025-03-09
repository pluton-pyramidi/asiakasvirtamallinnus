import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  muuToQueueRate: 0.5,
};

const muuSlice = createSlice({
  name: "muu",
  initialState,
  reducers: {
    setMuu: (state, action) => {
      state.muuToQueueRate = action.payload.muuToQueueRate;
    },
  },
});

export const { setMuu } = muuSlice.actions;
export default muuSlice.reducer;
