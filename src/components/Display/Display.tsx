import styles from "./Display.module.css";

interface DisplayProps {
  value: string;
}

function Display({ value }: DisplayProps) {
  return (
    <div className={styles.display}>
      <span className={styles.value}>{value}</span>
    </div>
  );
}

export default Display;
