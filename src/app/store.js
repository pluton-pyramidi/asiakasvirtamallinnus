import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import queueStateSliceReducer from "../features/queueState/queueStateSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    queueState: queueStateSliceReducer,
  },
});
