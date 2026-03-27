import React from "react";

interface NudgeProps {
  x?: number;
  y?: number;
  children: React.ReactNode;
}

function Nudge({ x = 0, y = 0, children }: NudgeProps) {
  return (
    <span style={{ display: "inline-block", transform: `translate(${x}px, ${y}px)` }}>
      {children}
    </span>
  );
}

export default Nudge;
