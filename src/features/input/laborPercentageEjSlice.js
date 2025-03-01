import createInputIntegerSlice from "./createInputIntegerSlice";

const laborPercentageEjSlice = createInputIntegerSlice(
  "laborPercentageEj",
  0.2
);

export const { setInput } = laborPercentageEjSlice.actions;
export default laborPercentageEjSlice.reducer;
