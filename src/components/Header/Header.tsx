import { type Theme } from "@/constants";
import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import styles from "./Header.module.css";

interface HeaderProps {
  defaultTheme: Theme;
}

function Header({ defaultTheme }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Logo as="h1" />
      <ThemeSwitcher defaultTheme={defaultTheme} />
    </header>
  );
}

export default Header;
