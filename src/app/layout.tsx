import type { Metadata } from "next";
import { cookies } from "next/headers";
import { League_Spartan } from "next/font/google";
import { THEME_COLORS, type Theme } from "@/constants";
import RespectMotionPreferences from "@/components/RespectMotionPreferences";

import "./globals.css";

export const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calculator",
  description: "A theme-switching calculator with keyboard support",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const savedTheme = (await cookies()).get("color-theme");
  const theme = (savedTheme?.value ?? "theme-1") as Theme;
  const themeColors = THEME_COLORS[theme] ?? THEME_COLORS["theme-1"];

  return (
    <RespectMotionPreferences>
      <html
        lang='en'
        className={leagueSpartan.variable}
        data-color-theme={theme}
        style={themeColors}
      >
        <body>
          {children}
        </body>
      </html>
    </RespectMotionPreferences>
  );
}
