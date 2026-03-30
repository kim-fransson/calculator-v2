import React from "react";

import styles from "./Button.module.css";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "type-1" | "type-2" | "type-3";
}

function Button({ variant, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(styles.button, styles[variant])}
      {...props}
    >
      <span className={styles.shadow}></span>
      <span className={styles.edge}></span>
      <span className={styles.front}>{children}</span>
    </button>
  );
}

export default Button;
