import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import createInputIntegerSlice from "../features/inputState/createInputStateSlice";

const initialQueueStateSlice = createInputIntegerSlice("initialQueue", 0);
export const {
  setInput: setInitialQueueInput,
  incrementInput: incrementInitialQueueInput,
  decrementInput: decrementInitialQueueInput,
} = initialQueueStateSlice.actions;

export default configureStore({
  reducer: {
    counter: counterReducer,
    initialQueueState: initialQueueStateSlice.reducer,
  },
});
