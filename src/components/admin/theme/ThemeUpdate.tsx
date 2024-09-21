"use client";

import React from "react";
import toast from "react-hot-toast";
import s from "@/styles/admin/AdminTheme.module.css";
import { THEME } from "@/constants/database";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { useAdminThemesContext } from "@/app/context/adminThemesProvider";

export default function ThemeUpdate() {
  const { setThemes } = useAdminThemesContext();
  const { workTheme } = useAdminWorkThemeContext();
  const name = workTheme.name;
  const isBaseTheme = name === THEME.BASE_THEME;

  const updateTheme = () => {
    fetch("admin/api/theme/update", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(workTheme),
    })
      .then((res) => res.json())
      .then((json) => {
        const themes = json.themes;
        if (themes) {
          toast.success(`Thème "${workTheme.name}" mis à jour`);
          if (workTheme.isActive) {
            setTimeout(function () {
              window.location.reload();
            }, 1500);
          } else {
            setThemes(themes);
          }
        } else toast.error("Erreur à la mise à jour du thème");
      });
  };

  return (
    <button
      onClick={updateTheme}
      className={`${s.themeInput} "adminButton"`}
      disabled={isBaseTheme}
    >
      {`Mettre à jour "${name}"`}
    </button>
  );
}
