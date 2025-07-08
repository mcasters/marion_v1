"use client";

import React from "react";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { Theme } from "@/generated/client";

export default function ThemeCancel() {
  const { workTheme, setWorkTheme, isUpdated, setIsUpdated, themes } =
    useAdminWorkThemeContext();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setWorkTheme(themes.find((t) => t.id === workTheme.id) as Theme);
        setIsUpdated(true);
      }}
      className="adminButton"
      disabled={isUpdated}
    >
      Annuler les changements
    </button>
  );
}
