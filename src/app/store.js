import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "../features/view/viewSlice";
import startReducer from "../features/input/startSlice";
import ensijasennysReducer from "../features/input/ensijasennysSlice";

export default configureStore({
  reducer: {
    view: viewReducer,
    start: startReducer,
    ensijasennys: ensijasennysReducer,
  },
});
