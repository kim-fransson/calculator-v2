import React from "react";
import { clampedNormalize } from "../../utils/math";
import styles from "./TapArea.module.css";

const WCAG_TARGET = 48;
const RED_FLOOR = 10;

function getTapAreaColor(size: number): React.CSSProperties {
  const hue =
    size >= WCAG_TARGET
      ? 120
      : clampedNormalize(size, RED_FLOOR, WCAG_TARGET, 0, 30);
  return {
    "--tap-area-debug-bg": `oklch(65% 0.25 ${hue}deg / 0.15)`,
    "--tap-area-debug-outline": `oklch(65% 0.25 ${hue}deg)`,
  } as React.CSSProperties;
}

interface TapAreaProps {
  children: React.ReactElement<{ className?: string; style?: React.CSSProperties }>;
  /** Minimum tap target size in px. Defaults to 44 (WCAG 2.5.5). Reduce only when targets are tightly spaced. */
  minSize?: number;
}

function TapArea({ children, minSize }: TapAreaProps) {
  const [showArea, setShowArea] = React.useState(false);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === "Alt") setShowArea(true);
      };
      const handleKeyUp = (ev: KeyboardEvent) => {
        if (ev.key === "Alt") setShowArea(false);
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, []);

  const tapAreaClass = [
    styles.tapArea,
    showArea ? styles.tapAreaVisible : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  const tapAreaStyle: React.CSSProperties = {
    ...(minSize !== undefined && { "--tap-area-min-size": `${minSize / 16}rem` } as React.CSSProperties),
    ...getTapAreaColor(minSize ?? 44),
  };

  return React.cloneElement(children, {
    className: [children.props.className, tapAreaClass]
      .filter(Boolean)
      .join(" "),
    style: { ...children.props.style, ...tapAreaStyle },
  });
}

export default TapArea;
