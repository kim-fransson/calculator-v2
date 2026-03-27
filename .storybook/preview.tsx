import type { Preview } from "@storybook/nextjs-vite";
import { League_Spartan } from "next/font/google";

import "../src/app/globals.css";
import { THEME_COLORS } from "../src/constants";
import ThemeSwitcher from "../src/components/ThemeSwitcher/ThemeSwitcher";

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
});

const preview: Preview = {
  decorators: [
    (Story) => {
      // need to add the fonts to the root html element -> do it this way
      document.documentElement.classList.add(leagueSpartan.variable);
      // apply default theme-1 colors as CSS custom properties
      const themeColors = THEME_COLORS["theme-1"];
      Object.entries(themeColors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(
          key,
          value as string,
        );
      });
      return (
        <>
          <div
            style={{
              height: "4rem",
              padding: "8px",
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "40px",
            }}
          >
            <ThemeSwitcher defaultTheme='theme-1' />
          </div>
          <Story />
        </>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
