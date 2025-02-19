import { createSlice } from "@reduxjs/toolkit";

export const queueStateSlice = createSlice({
  name: "queueState",
  initialState: {
    value: 0,
  },
  reducers: {
    setQueue: (state, action) => {
      state.value = action.payload;
    },
    incrementQueue: (state) => {
      state.value += 1;
    },
    decrementQueue: (state) => {
      state.value -= 1;
    },
  },
});

export const { setQueue, incrementQueue, decrementQueue } =
  queueStateSlice.actions;
export default queueStateSlice.reducer;
