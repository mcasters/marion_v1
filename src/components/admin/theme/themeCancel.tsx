"use client";

import React from "react";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { Theme } from "@prisma/client";

export default function ThemeCancel() {
  const { workTheme, setWorkTheme, setIsUpdated, themes } =
    useAdminWorkThemeContext();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setWorkTheme(themes.find((t) => t.id === workTheme.id) as Theme);
        setIsUpdated(true);
      }}
      className="adminButton"
    >
      Annuler les changements
    </button>
  );
}
