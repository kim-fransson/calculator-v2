"use client";

import styles from "./Display.module.css";

interface DisplayProps {
  value: string;
  history?: string | null;
}

function Display({ value, history }: DisplayProps) {
  return (
    <output className={styles.display} aria-label={`${history ? history + ' ' : ''}${value}`}>
      {history && <span className={styles.history} aria-hidden="true">{history}</span>}
      <span className={styles.value} aria-hidden="true">{value}</span>
    </output>
  );
}

export default Display;
