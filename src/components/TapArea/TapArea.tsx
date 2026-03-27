import React from "react";
import styles from "./TapArea.module.css";

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

  const tapAreaStyle = minSize !== undefined
    ? { "--tap-area-min-size": `${minSize / 16}rem` } as React.CSSProperties
    : undefined;

  return React.cloneElement(children, {
    className: [children.props.className, tapAreaClass]
      .filter(Boolean)
      .join(" "),
    style: { ...children.props.style, ...tapAreaStyle },
  });
}

export default TapArea;
