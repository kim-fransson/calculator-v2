"use client";

import styles from "./Display.module.css";

interface DisplayProps {
  value: string;
  history?: string | null;
}

function Display({ value, history }: DisplayProps) {
  return (
    <div className={styles.display}>
      {history && <span className={styles.history}>{history}</span>}
      <span className={styles.value}>{value}</span>
    </div>
  );
}

export default Display;
