import * as React from "react";
import { NumberField } from "@base-ui-components/react/number-field";
import styles from "../utils/numberField.module.css";

// Clicking and typing in the field is clumsy and very unintuitive now.
// The user must input decimal numbers (all integers are interpreted as 1 => 100 %) AND the user must enter the input before the %-symbol. No input is registered if input is entered after the %-symbol.
// Also after typing, the rendered field value doesn't update & format until the user clicks themselves "out" of the field (event: focusout). Pressing "Enter" would be a nice option.

export default function PercentageInput(props) {
  const handleValueChange = (value, event = {}) => {
    if (event && event.type) {
      console.log("Event type:", event.type);
    }
    props.handleChange({ target: { value } });
  };

  return (
    <NumberField.Root
      min={0}
      max={1}
      step={0.01}
      smallStep={0.001}
      largeStep={0.1}
      value={props.value}
      format={
        ("en-US",
        {
          style: "percent",
          maximumFractionDigits: 3,
        })
      }
      className={styles.Field}
      onValueChange={handleValueChange}
    >
      <NumberField.ScrubArea className={styles.ScrubArea}>
        <label className={styles.Label}>{props.label}</label>
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
