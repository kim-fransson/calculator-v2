import React from "react";

import styles from "./MaxWidthWrapper.module.css";

interface MaxWidthWrapperProps {
  children: React.ReactNode;
  as?: React.ElementType;
}

function MaxWidthWrapper({
  children,
  as: Template = "div",
}: MaxWidthWrapperProps) {
  return <Template className={styles.wrapper}>{children}</Template>;
}

export default MaxWidthWrapper;
