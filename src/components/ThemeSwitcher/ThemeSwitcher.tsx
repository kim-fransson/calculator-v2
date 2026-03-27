"use client";

import { useState } from "react";
import Cookie from "js-cookie";
import { THEME_COLORS, type Theme } from "@/constants";
import styles from "./ThemeSwitcher.module.css";

interface ThemeSwitcherProps {
  defaultTheme: Theme;
}

const themes = ["theme-1", "theme-2", "theme-3"] as const;
const labels = ["1", "2", "3"];

function ThemeSwitcher({ defaultTheme }: ThemeSwitcherProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  function handleThemeChange(newTheme: Theme) {
    setTheme(newTheme);

    Cookie.set("color-theme", newTheme, {
      expires: 1000,
    });

    const root = document.documentElement;
    root.setAttribute("data-color-theme", newTheme);
    Object.entries(THEME_COLORS[newTheme]).forEach(([key, value]) => {
      root.style.setProperty(key, value as string);
    });
  }

  return (
    <div
      role='group'
      aria-labelledby='theme-switcher-label'
      className={styles.container}
    >
      <span id='theme-switcher-label' className={styles.groupLabel}>
        THEME
      </span>

      <div className={styles.selectorContainer}>
        <div className={styles.numberContainer}>
          {themes.map((t, i) => (
            <label
              key={t}
              htmlFor={`theme-radio-${t}`}
              className={styles.number}
            >
              {labels[i]}
            </label>
          ))}
        </div>

        <div className={styles.toggleContainer}>
          {themes.map((t) => (
            <label
              key={t}
              htmlFor={`theme-radio-${t}`}
              className={styles.toggleOption}
            >
              <span
                className={styles.visualInput}
                aria-hidden='true'
                data-selected={theme === t ? "true" : undefined}
              />
              <input
                type='radio'
                id={`theme-radio-${t}`}
                name='color-theme'
                value={t}
                checked={theme === t}
                onChange={() => handleThemeChange(t)}
                className={styles.nativeInput}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThemeSwitcher;
