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
    },
  });
};

export default createInputIntegerSlice;
