"use client";

import { Dispatch, useEffect, useRef } from "react";
import type { CalculatorAction } from "@/calculator/types";

const THROTTLE_MS = 100;

export function useKeyPress(dispatch: Dispatch<CalculatorAction>): void {
  const lastFiredAt = useRef<number>(0);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const { key } = e;

      // Allow Backspace/Delete to repeat (throttled), block repeat for everything else
      if (e.repeat && key !== "Backspace" && key !== "Delete") return;

      const now = Date.now();

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
        e.preventDefault(); // prevent browser quick-find
        dispatch({ type: "OPERATOR", payload: "/" });
      } else if (key === "Enter" || key === "=") {
        dispatch({ type: "EQUALS" });
      } else if (key === "Backspace" || key === "Delete") {
        // Throttle repeating delete
        if (now - lastFiredAt.current < THROTTLE_MS) return;
        lastFiredAt.current = now;
        dispatch({ type: "DELETE" });
      } else if (key === "Escape") {
        dispatch({ type: "RESET" });
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);
}
