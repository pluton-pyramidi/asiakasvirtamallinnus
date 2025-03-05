import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "../features/view/viewSlice";
import startReducer from "../features/input/startSlice";
import ejReducer from "../features/input/ejSlice";

export default configureStore({
  reducer: {
    view: viewReducer,
    start: startReducer,
    ej: ejReducer,
  },
});
