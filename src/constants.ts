export const THEME_1_COLORS = {
  "--color-text": "var(--color-white)",
  "--color-background": "var(--color-navy-850)",
  "--color-type-1": "var(--color-gray-200)",
  "--color-type-1-background": "var(--color-navy-900)",
  "--color-type-1-active": "var(--color-white)",
  "--color-type-1-shadow": "hsl(27, 14%, 65%)",
  "--color-type-1-text": "var(--color-navy-750)",
  "--color-type-2-background": "var(--color-navy-950)",
  "--color-type-2": "var(--color-navy-700)",
  "--color-type-2-active": "var(--color-navy-400)",
  "--color-type-2-shadow": "hsl(224, 41%, 36%)",
  "--color-type-2-text": "var(--color-white)",
  "--color-type-3": "var(--color-red-600)",
  "--color-type-3-active": "var(--color-red-400)",
  "--color-type-3-shadow": "hsl(6, 70%, 34%)",
  "--color-type-3-text": "var(--color-white)",
} as React.CSSProperties;

export const THEME_2_COLORS = {
  "--color-text": "var(--color-gray-900)",
  "--color-background": "var(--color-gray-200)",
  "--color-type-1": "var(--color-gray-200)",
  "--color-type-1-background": "var(--color-gray-300)",
  "--color-type-1-active": "var(--color-white)",
  "--color-type-1-shadow": "hsl(27, 10%, 60%)",
  "--color-type-1-text": "var(--color-gray-900)",
  "--color-type-2-background": "var(--color-gray-100)",
  "--color-type-2": "var(--color-blue-500)",
  "--color-type-2-active": "var(--color-blue-400)",
  "--color-type-2-shadow": "hsl(185, 58%, 25%)",
  "--color-type-2-text": "var(--color-white)",
  "--color-type-3": "var(--color-orange-700)",
  "--color-type-3-active": "var(--color-orange-400)",
  "--color-type-3-shadow": "hsl(28, 100%, 27%)",
  "--color-type-3-text": "var(--color-white)",
} as React.CSSProperties;

export const THEME_3_COLORS = {
  "--color-text": "var(--color-yellow-300)",
  "--color-background": "var(--color-purple-950)",
  "--color-type-1": "hsl(268, 44%, 21%)",
  "--color-type-1-background": "var(--color-purple-900)",
  "--color-type-1-active": "var(--color-purple-700)",
  "--color-type-1-shadow": "hsl(290, 71%, 36%)",
  "--color-type-1-text": "var(--color-yellow-300)",
  "--color-type-2-background": "var(--color-purple-900)",
  "--color-type-2": "hsl(283, 83%, 25%)",
  "--color-type-2-active": "var(--color-purple-650)",
  "--color-type-2-shadow": "hsl(291, 92%, 53%)",
  "--color-type-2-text": "var(--color-white)",
  "--color-type-3": "var(--color-cyan-500)",
  "--color-type-3-active": "var(--color-cyan-200)",
  "--color-type-3-shadow": "hsl(176, 92%, 70%)",
  "--color-type-3-text": "hsl(198, 20%, 13%)",
} as React.CSSProperties;

export type Theme = "theme-1" | "theme-2" | "theme-3";

export const THEME_COLORS: Record<Theme, React.CSSProperties> = {
  "theme-1": THEME_1_COLORS,
  "theme-2": THEME_2_COLORS,
  "theme-3": THEME_3_COLORS,
};
