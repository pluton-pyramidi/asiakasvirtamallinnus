import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "../features/view/viewSlice";
import initialQueueReducer from "../features/input/initialQueueSlice";
import newPatientsMonthlyReducer from "../features/input/newPatientsMonthlySlice";
import laborSoulsEjReducer from "../features/input/laborSoulsEjSlice";
import laborPercentageEjReducer from "../features/input/laborPercentageEjSlice";
import startReducer from "../features/input/startSlice";
import ejReducer from "../features/input/ejSlice";

export default configureStore({
  reducer: {
    view: viewReducer,
    initialQueue: initialQueueReducer,
    newPatientsMonthly: newPatientsMonthlyReducer,
    laborSoulsEj: laborSoulsEjReducer,
    laborPercentageEj: laborPercentageEjReducer,
    start: startReducer,
    ej: ejReducer,
  },
});
