"use client";

import { useId, useState } from "react";
import Cookie from "js-cookie";
import { AnimatePresence, motion } from "motion/react";
import { THEME_COLORS, type Theme } from "@/constants";

import styles from "./ThemeSwitcher.module.css";
import Nudge from "../Nudge";
import TapArea from "../TapArea";

interface ThemeSwitcherProps {
  defaultTheme: Theme;
}

function ThemeSwitcher({ defaultTheme }: ThemeSwitcherProps) {
  const [currentTheme, setTheme] = useState<Theme>(defaultTheme);
  const id = useId();

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
        <Nudge y={-6}>THEME</Nudge>
      </span>

      <div className={styles.selectorContainer}>
        <div className={styles.numberContainer}>
          {Object.keys(THEME_COLORS).map((theme, i) => (
            <TapArea key={theme} minSize={16}>
              <label
                htmlFor={`theme-radio-${theme}`}
                className={styles.number}
              >
                {i + 1}
              </label>
            </TapArea>
          ))}
        </div>

        <div className={styles.toggleContainer}>
          {Object.keys(THEME_COLORS).map((theme) => (
            <TapArea key={theme} minSize={20}>
              <label
                htmlFor={`theme-radio-${theme}`}
                className={styles.toggleOption}
              >
                <input
                  type='radio'
                  id={`theme-radio-${theme}`}
                  name='color-theme'
                  value={theme}
                  checked={currentTheme === theme}
                  onChange={() => handleThemeChange(theme as Theme)}
                  className={styles.nativeInput}
                />
                <AnimatePresence>
                  {currentTheme === theme && (
                    <motion.span
                      className={styles.visualInput}
                      aria-hidden='true'
                      layoutId={id}
                    />
                  )}
                </AnimatePresence>
              </label>
            </TapArea>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThemeSwitcher;
