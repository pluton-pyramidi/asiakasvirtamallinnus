import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "../features/view/viewSlice";
import initialQueueReducer from "../features/input/initialQueueSlice";
import newPatientsMonthlyReducer from "../features/input/newPatientsMonthlySlice";

export default configureStore({
  reducer: {
    view: viewReducer,
    initialQueue: initialQueueReducer,
    newPatientsMonthly: newPatientsMonthlyReducer,
  },
});
