"use client";

import { motion, AnimatePresence, Transition } from "motion/react";
import styles from "./Display.module.css";

interface DisplayProps {
  value: string;
  history?: string | null;
}

const SPRING = {
  type: "spring",
  stiffness: 200,
  damping: 40,
} as Transition;

function Display({ value, history }: DisplayProps) {
  return (
    <motion.div
      transition={SPRING}
      layout='size'
      className={styles.display}
    >
      {history && (
        <motion.span
          layout='position'
          transition={SPRING}
          className={styles.history}
        >
          {history}
        </motion.span>
      )}
      <motion.span
        layout='position'
        transition={SPRING}
        className={styles.value}
      >
        {value}
      </motion.span>
    </motion.div>
  );
}

export default Display;
