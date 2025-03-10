import { createSlice } from "@reduxjs/toolkit";

// This state represents the set of values which are displayed for input/changing at a time, selected by clicking buttons in Model.jsx
const initialState = {
  currentView: "view1",
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setView: (state, action) => {
      state.currentView = action.payload;
    },
  },
});

export const { setView } = viewSlice.actions;
export default viewSlice.reducer;
