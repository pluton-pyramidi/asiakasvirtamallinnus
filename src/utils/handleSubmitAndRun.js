import { calculateSimulationBalance } from "../features/run/balanceSlice";

/**
 * A reusable function to handle submitting input to a Redux reducer.
 * @param {Function} dispatch - The Redux dispatch function.
 * @param {Object} input - The input data to be dispatched.
 * @param {Function} setAction - The Redux action creator (e.g., setPatientInput).
 */

// Here running the sim must await for setAction to complete: need to figure out how to do
// OR the graph x-axis must be set to be at least the lenght of the data array
export const handleSubmitAndRun = (dispatch, input, setAction) => {
  console.log("Dispatching input state:", input);
  dispatch(setAction(input)); // Dispatch the input to the specified reducer
  dispatch(calculateSimulationBalance());
};
