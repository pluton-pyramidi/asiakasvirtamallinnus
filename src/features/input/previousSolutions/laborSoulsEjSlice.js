import createInputIntegerSlice from "../../../utils/createInputIntegerSlice.js";

const laborSoulsEjSlice = createInputIntegerSlice("laborSoulsEj", 5);

export const { setInput } = laborSoulsEjSlice.actions;
export default laborSoulsEjSlice.reducer;
