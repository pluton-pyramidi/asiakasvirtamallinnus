import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "../features/view/viewSlice";
import patientInputReducer from "../features/input/patientInputSlice";
import ensijasennysReducer from "../features/input/ensijasennysSlice";
import hoitoonohjausReducer from "../features/input/hoitoonohjausSlice";
import tauReducer from "../features/input/tauSlice";
import stepOneReducer from "../features/input/stepOneSlice";
import stepTwoReducer from "../features/input/stepTwoSlice";
import muuReducer from "../features/input/muuSlice";

export default configureStore({
  reducer: {
    view: viewReducer,
    patientInput: patientInputReducer,
    ensijasennys: ensijasennysReducer,
    hoitoonohjaus: hoitoonohjausReducer,
    tau: tauReducer,
    stepOne: stepOneReducer,
    stepTwo: stepTwoReducer,
    muu: muuReducer,
  },
});
