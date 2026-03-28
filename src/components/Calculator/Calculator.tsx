"use client";

import { useReducer } from "react";
import { calculatorReducer, INITIAL_STATE, formatDisplay } from "@/calculator/calculator";
import Display from "@/components/Display";
import Keypad from "@/components/Keypad";
import styles from "./Calculator.module.css";

function Calculator() {
  const [state, dispatch] = useReducer(calculatorReducer, INITIAL_STATE);

  return (
    <div className={styles.calculator}>
      <Display value={formatDisplay(state.display)} />
      <Keypad dispatch={dispatch} />
    </div>
  );
}

export default Calculator;
