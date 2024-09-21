"use client";
import { createContext, ReactNode, useContext } from "react";
import { Theme } from "@prisma/client";

const ThemeContext = createContext<Theme>({} as Theme);

interface Props {
  theme: Theme;
  children: ReactNode;
}

export function ThemeProvider({ theme, children }: Props) {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
