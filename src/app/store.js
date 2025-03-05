import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "../features/view/viewSlice";
import startReducer from "../features/input/startSlice";
import ensijasennysReducer from "../features/input/ensijasennysSlice";
import hoitoonohjausReducer from "../features/input/hoitoonohjausSlice";

export default configureStore({
  reducer: {
    view: viewReducer,
    start: startReducer,
    ensijasennys: ensijasennysReducer,
    hoitoonohjaus: hoitoonohjausReducer,
  },
});
