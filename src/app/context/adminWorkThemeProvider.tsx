"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
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
  children: ReactNode;
}

export function AdminWorkThemeProvider({ children, defaultWorkTheme }: Props) {
  const [workTheme, setWorkTheme] = useState<Theme>(defaultWorkTheme);

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
