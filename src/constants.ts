export const THEME_1_COLORS = {
  "--color-text": "var(--color-white)",
  "--color-background": "var(--color-black)",
} as React.CSSProperties;

export const THEME_2_COLORS = {
  "--color-text": "var(--color-gray-900)",
  "--color-background": "var(--color-white)",
} as React.CSSProperties;

export const THEME_3_COLORS = {
  "--color-text": "var(--color-yellow-300)",
  "--color-background": "var(--color-black)",
} as React.CSSProperties;

export type Theme = "theme-1" | "theme-2" | "theme-3";

export const THEME_COLORS: Record<Theme, React.CSSProperties> = {
  "theme-1": THEME_1_COLORS,
  "theme-2": THEME_2_COLORS,
  "theme-3": THEME_3_COLORS,
};
