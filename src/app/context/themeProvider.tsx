"use client";
import { createContext, ReactNode, useContext } from "react";
import { Theme } from "@prisma/client";
import { ThemeEnhanced } from "@/lib/type";

const ThemeContext = createContext<ThemeEnhanced>({} as Theme);

interface Props {
  theme: ThemeEnhanced;
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
