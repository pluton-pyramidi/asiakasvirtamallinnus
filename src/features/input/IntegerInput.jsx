import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NumberField } from "@base-ui-components/react/number-field";
import styles from "../../customStyles/numberField.module.css";

export default function IntegerInput({ fieldLabel, stateId }) {
  const inputState = useSelector((state) => state[stateId]?.value ?? "");
  const dispatch = useDispatch();
  const [sliceAction, setSliceAction] = useState("");

  /* This hook dynamically imports the stateId designated state action */
  useEffect(() => {
    const loadSlice = async () => {
      try {
        const module = await import(`./${stateId}Slice.js`);
        console.log(`Loaded slice for stateId: ${stateId}`, module);
        /* Thus far this modular number input field only works with a state setter named "setInput" */
        setSliceAction(() => module.setInput);
      } catch (error) {
        console.error(`Failed to load slice for stateId: ${stateId}`, error);
      }
    };
    loadSlice();
  }, [stateId]);

  const handleChange = (value) => {
    if (sliceAction) {
      console.log(`Dispatching action for stateId: ${stateId} ${sliceAction}`);
      dispatch(sliceAction(Number(value)));
    } else {
      console.log(`No action found for stateId: ${stateId}`);
    }
  };

  return (
    <NumberField.Root
      value={inputState}
      className={styles.Field}
      onValueChange={handleChange}
    >
      <NumberField.ScrubArea className={styles.ScrubArea}>
        <label className={styles.Label}>{fieldLabel}</label>
        <NumberField.ScrubAreaCursor className={styles.ScrubAreaCursor}>
          <CursorGrowIcon />
        </NumberField.ScrubAreaCursor>
      </NumberField.ScrubArea>

      <NumberField.Group className={styles.Group}>
        <NumberField.Decrement className={styles.Decrement}>
          <MinusIcon />
        </NumberField.Decrement>
        <NumberField.Input className={styles.Input} />
        <NumberField.Increment className={styles.Increment}>
          <PlusIcon />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}

function CursorGrowIcon(props) {
  return (
    <svg
      width="26"
      height="14"
      viewBox="0 0 24 14"
      fill="black"
      stroke="white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H5M10 5H5M5 5V0M5 5V10" />
    </svg>
  );
}

function MinusIcon(props) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H10" />
    </svg>
  );
}
