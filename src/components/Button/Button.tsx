import React from "react";

import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "type-1" | "type-2" | "type-3";
}

function Button({ variant, children, ...props }: ButtonProps) {
  return (
    <button className={styles[variant]} {...props}>
      {children}
    </button>
  );
}

export default Button;
