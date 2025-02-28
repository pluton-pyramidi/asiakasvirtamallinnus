import { configureStore } from "@reduxjs/toolkit";
import initialQueueReducer from "../features/input/initialQueueSlice";
import viewReducer from "../features/view/viewSlice";

export default configureStore({
  reducer: {
    initialQueue: initialQueueReducer,
    view: viewReducer,
  },
});
