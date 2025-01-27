"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Theme } from "@prisma/client";

export interface AdminWorkThemeContextType {
  workTheme: Theme;
  setWorkTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const AdminWorkThemeContext = createContext<AdminWorkThemeContextType>(
  {} as AdminWorkThemeContextType,
);

interface Props {
  defaultWorkTheme: Theme;
  themes: Theme[];
  children: ReactNode;
}

export function AdminWorkThemeProvider({
  children,
  defaultWorkTheme,
  themes,
}: Props) {
  const [workTheme, setWorkTheme] = useState<Theme>(defaultWorkTheme);

  useEffect(() => {
    const workThemeUpdated = themes.find((t: Theme) => t.id === workTheme.id);
    if (workThemeUpdated) setWorkTheme(workThemeUpdated);
  }, [themes]);

  return (
    <AdminWorkThemeContext.Provider
      value={{
        workTheme,
        setWorkTheme,
      }}
    >
      {children}
    </AdminWorkThemeContext.Provider>
  );
}

export function useAdminWorkThemeContext() {
  return useContext(AdminWorkThemeContext);
}
