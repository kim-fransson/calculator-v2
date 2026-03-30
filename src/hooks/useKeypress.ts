"use client";

import { useEffect, useRef } from "react";

type KeypressHandler = (event: KeyboardEvent) => void;

interface UseKeypressOptions {
  /**
   * Controls behavior when `e.repeat` is true (key held down).
   *
   * - "block-all"  : swallow every repeated keydown (default)
   * - "allow-all"  : let all repeats through
   * - Set<string>  : allow repeats only for the listed key values
   */
  repeat?: "block-all" | "allow-all" | Set<string>;
}

export function useKeypress(
  handler: KeypressHandler,
  options: UseKeypressOptions = {},
): void {
  const { repeat = "block-all" } = options;

  const handlerRef = useRef<KeypressHandler>(handler);
  // eslint-disable-next-line react-hooks/refs
  handlerRef.current = handler;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.repeat) {
        if (repeat === "block-all") return;
        if (repeat instanceof Set && !repeat.has(e.key)) return;
      }

      handlerRef.current(e);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [repeat]);
}
