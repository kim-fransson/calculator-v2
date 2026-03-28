import { cookies } from "next/headers";
import { type Theme } from "@/constants";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Header from "@/components/Header";
import Calculator from "@/components/Calculator";

import styles from "./page.module.css";

export default async function Home() {
  const savedTheme = (await cookies()).get("color-theme");
  const theme = (savedTheme?.value ?? "theme-1") as Theme;

  return (
    <div className={styles.page}>
      <MaxWidthWrapper>
        <div className={styles.content}>
          <Header defaultTheme={theme} />
          <Calculator />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
