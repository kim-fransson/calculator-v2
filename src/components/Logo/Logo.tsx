import React from "react";

import styles from "./Logo.module.css";

interface LogoProps {
  as?: React.ElementType;
}

function Logo({ as: Template = "h1" }: LogoProps) {
  return <Template className={styles.wrapper}>calc</Template>;
}

export default Logo;
