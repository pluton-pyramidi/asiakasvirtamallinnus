import { lab } from "d3";
import createInputIntegerSlice from "./createInputIntegerSlice";

const laborSoulsEjSlice = createInputIntegerSlice("laborSoulsEj", 5);

export const { setInput } = laborSoulsEjSlice.actions;
export default laborSoulsEjSlice.reducer;
