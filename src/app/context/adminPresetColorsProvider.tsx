"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { PresetColor } from "@prisma/client";

export interface AdminPresetColorsContextType {
  presetColors: PresetColor[];
  setPresetColors: React.Dispatch<React.SetStateAction<PresetColor[]>>;
}

const AdminPresetColorsContext = createContext<AdminPresetColorsContextType>(
  {} as AdminPresetColorsContextType,
);

interface Props {
  defaultPresetColors: PresetColor[];
  children: ReactNode;
}

export function AdminPresetColorsProvider({
  children,
  defaultPresetColors,
}: Props) {
  const [presetColors, setPresetColors] =
    useState<PresetColor[]>(defaultPresetColors);

  return (
    <AdminPresetColorsContext.Provider
      value={{
        presetColors,
        setPresetColors,
      }}
    >
      {children}
    </AdminPresetColorsContext.Provider>
  );
}

export function useAdminPresetColorsContext() {
  return useContext(AdminPresetColorsContext);
}
