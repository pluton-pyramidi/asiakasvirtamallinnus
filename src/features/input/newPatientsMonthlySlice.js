import createInputIntegerSlice from "../../utils/createInputIntegerSlice.js";

const newPatientsMonthlySlice = createInputIntegerSlice(
  "newPatientsMonthly",
  10
);

export const { setInput } = newPatientsMonthlySlice.actions;
export default newPatientsMonthlySlice.reducer;
