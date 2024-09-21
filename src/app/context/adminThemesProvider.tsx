"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Theme } from "@prisma/client";

export interface AdminThemesContextType {
  themes: Theme[];
  setThemes: React.Dispatch<React.SetStateAction<Theme[]>>;
}

const AdminThemesContext = createContext<AdminThemesContextType>(
  {} as AdminThemesContextType,
);

interface Props {
  defaultThemes: Theme[];
  children: ReactNode;
}

export function AdminThemesProvider({ children, defaultThemes }: Props) {
  const [themes, setThemes] = useState<Theme[]>(defaultThemes);

  return (
    <AdminThemesContext.Provider
      value={{
        themes,
        setThemes,
      }}
    >
      {children}
    </AdminThemesContext.Provider>
  );
}

export function useAdminThemesContext() {
  return useContext(AdminThemesContext);
}
