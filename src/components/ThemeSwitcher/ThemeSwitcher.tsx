"use client";

import { useId, useState } from "react";
import Cookie from "js-cookie";
import { AnimatePresence, motion } from "motion/react";
import { THEME_COLORS, type Theme } from "@/constants";

import styles from "./ThemeSwitcher.module.css";
import Nudge from "../Nudge";
import TapArea from "../TapArea";
import VisuallyHidden from "../VisuallyHidden";

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
    <div className={styles.container}>
      <span className={styles.groupLabel}>
        <Nudge y={-6}>THEME</Nudge>
      </span>

      <div
        role='radiogroup'
        aria-labelledby='theme-switcher-label'
        className={styles.selectorContainer}
      >
        <VisuallyHidden>
          <p id='theme-switcher-label'>
            Switch between color themes 1, 2 or 3
          </p>
        </VisuallyHidden>
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
            <div key={theme} className={styles.toggleOption}>
              <TapArea minSize={20}>
                <input
                  type='radio'
                  id={`theme-radio-${theme}`}
                  name='color-theme'
                  value={theme}
                  checked={currentTheme === theme}
                  onChange={() => handleThemeChange(theme as Theme)}
                  className={styles.nativeInput}
                />
              </TapArea>
              <AnimatePresence>
                {currentTheme === theme && (
                  <motion.span
                    className={styles.visualInput}
                    aria-hidden='true'
                    layoutId={id}
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThemeSwitcher;
