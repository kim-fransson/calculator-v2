"use client";

import { useReducer } from "react";
import { calculatorReducer, INITIAL_STATE, formatDisplay, OPERATOR_DISPLAY } from "@/calculator/calculator";
import Display from "@/components/Display";
import Keypad from "@/components/Keypad";
import { useKeyPress } from "@/hooks/useKeyPress";
import styles from "./Calculator.module.css";

function Calculator() {
  const [state, dispatch] = useReducer(calculatorReducer, INITIAL_STATE);
  useKeyPress(dispatch);

  const history = state.expression
    ? `${state.expression}${OPERATOR_DISPLAY[state.operator!]}`
    : null;

  return (
    <div className={styles.calculator}>
      <Display value={formatDisplay(state.display)} history={history} />
      <Keypad dispatch={dispatch} />
    </div>
  );
}

export default Calculator;
