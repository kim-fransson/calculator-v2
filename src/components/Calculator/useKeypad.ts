"use client";

import { Dispatch, useCallback, useRef } from "react";
import type { CalculatorAction } from "@/calculator/types";
import { useKeypress } from "@/hooks/useKeypress";

const THROTTLE_MS = 100;

/** Keys that are allowed to repeat (subject to our own throttle). */
const REPEATABLE_KEYS = new Set(["Backspace", "Delete"]);

export function useKeypad(dispatch: Dispatch<CalculatorAction>): void {
  const lastFiredAt = useRef<number>(0);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      const { key } = e;

      if (/^[0-9]$/.test(key)) {
        dispatch({ type: "DIGIT", payload: key });
      } else if (key === ".") {
        dispatch({ type: "DECIMAL" });
      } else if (key === "+") {
        dispatch({ type: "OPERATOR", payload: "+" });
      } else if (key === "-") {
        dispatch({ type: "OPERATOR", payload: "-" });
      } else if (key === "*") {
        dispatch({ type: "OPERATOR", payload: "*" });
      } else if (key === "/") {
        e.preventDefault();
        dispatch({ type: "OPERATOR", payload: "/" });
      } else if (key === "Enter" || key === "=") {
        if (e.target instanceof HTMLButtonElement) return;
        dispatch({ type: "EQUALS" });
      } else if (key === "Backspace" || key === "Delete") {
        const now = Date.now();
        if (now - lastFiredAt.current < THROTTLE_MS) return;
        lastFiredAt.current = now;
        dispatch({ type: "DELETE" });
      } else if (key === "Escape") {
        dispatch({ type: "RESET" });
      }
    },
    [dispatch],
  );

  useKeypress(handleKey, { repeat: REPEATABLE_KEYS });
}
