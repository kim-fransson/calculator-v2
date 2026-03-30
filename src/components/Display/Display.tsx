"use client";

import styles from "./Display.module.css";

interface DisplayProps {
  value: string;
  history?: string | null;
}

function Display({ value, history }: DisplayProps) {
  return (
    <output className={styles.display} aria-label="Calculator result">
      {history && <span className={styles.history} aria-label="Previous expression">{history}</span>}
      <span className={styles.value} aria-label="Current value">{value}</span>
    </output>
  );
}

export default Display;
