import React from "react";
import type { CalculatorAction } from "@/calculator/types";
import Button from "@/components/Button";
import styles from "./Keypad.module.css";

interface KeypadProps {
  dispatch: React.Dispatch<CalculatorAction>;
}

function Keypad({ dispatch }: KeypadProps) {
  return (
    <div className={styles.keypad}>
      <div className={styles.rows}>
        <div className={styles.row}>
          <Button variant="type-1" onClick={() => dispatch({ type: "DIGIT", payload: "7" })}>7</Button>
          <Button variant="type-1" onClick={() => dispatch({ type: "DIGIT", payload: "8" })}>8</Button>
          <Button variant="type-1" onClick={() => dispatch({ type: "DIGIT", payload: "9" })}>9</Button>
          <Button variant="type-2" onClick={() => dispatch({ type: "DELETE" })}>DEL</Button>
        </div>
        <div className={styles.row}>
          <Button variant="type-1" onClick={() => dispatch({ type: "DIGIT", payload: "4" })}>4</Button>
          <Button variant="type-1" onClick={() => dispatch({ type: "DIGIT", payload: "5" })}>5</Button>
          <Button variant="type-1" onClick={() => dispatch({ type: "DIGIT", payload: "6" })}>6</Button>
          <Button variant="type-1" onClick={() => dispatch({ type: "OPERATOR", payload: "+" })}>+</Button>
        </div>
        <div className={styles.row}>
          <Button variant="type-1" onClick={() => dispatch({ type: "DIGIT", payload: "1" })}>1</Button>
          <Button variant="type-1" onClick={() => dispatch({ type: "DIGIT", payload: "2" })}>2</Button>
          <Button variant="type-1" onClick={() => dispatch({ type: "DIGIT", payload: "3" })}>3</Button>
          <Button variant="type-1" onClick={() => dispatch({ type: "OPERATOR", payload: "-" })}>−</Button>
        </div>
        <div className={styles.row}>
          <Button variant="type-1" onClick={() => dispatch({ type: "DECIMAL" })}>.</Button>
          <Button variant="type-1" onClick={() => dispatch({ type: "DIGIT", payload: "0" })}>0</Button>
          <Button variant="type-1" onClick={() => dispatch({ type: "OPERATOR", payload: "/" })}>/</Button>
          <Button variant="type-1" onClick={() => dispatch({ type: "OPERATOR", payload: "*" })}>×</Button>
        </div>
        <div className={styles.row}>
          <div className={styles.wide}>
            <Button variant="type-2" onClick={() => dispatch({ type: "RESET" })}>RESET</Button>
          </div>
          <div className={styles.wide}>
            <Button variant="type-3" onClick={() => dispatch({ type: "EQUALS" })}>=</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Keypad;
