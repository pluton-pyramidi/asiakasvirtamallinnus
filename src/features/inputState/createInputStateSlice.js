import { createSlice } from "@reduxjs/toolkit";

const createInputIntegerSlice = (name, initialValue) => {
  return createSlice({
    name,
    initialState: {
      value: initialValue,
    },
    reducers: {
      setInput: (state, action) => {
        state.value = action.payload;
      },
      incrementInput: (state) => {
        state.value += 1;
      },
      decrementInput: (state) => {
        state.value -= 1;
      },
    },
  });
};

export default createInputIntegerSlice;
