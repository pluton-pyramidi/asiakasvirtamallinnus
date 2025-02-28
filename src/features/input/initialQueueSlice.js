import createInputIntegerSlice from "./createInputIntegerSlice";

const initialQueueSlice = createInputIntegerSlice("initialQueue", 10);

export const { setInput } = initialQueueSlice.actions;
export default initialQueueSlice.reducer;
