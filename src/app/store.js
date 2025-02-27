import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import createInputIntegerSlice from "../features/inputInteger/createInputIntegerSlice";
import viewReducer from "../features/view/viewSlice";

/* Initialize a new slice, give it a name and an intial value*/
const initialQueueStateSlice = createInputIntegerSlice("initialQueue", 0);
/* */

export const {
  setInput: setInitialQueue,
  incrementInput: incrementInitialQueue,
  decrementInput: decrementInitialQueue,
} = initialQueueStateSlice.actions;

export default configureStore({
  reducer: {
    counter: counterReducer,
    initialQueue: initialQueueStateSlice.reducer,
    view: viewReducer,
  },
});
