"use client";
import { createContext, ReactNode, useContext } from "react";
import { StructuredTheme } from "@/lib/type";

const ThemeContext = createContext<StructuredTheme>({} as StructuredTheme);

interface Props {
  theme: StructuredTheme;
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
