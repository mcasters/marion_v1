"use client";

import React from "react";
import s from "@/styles/admin/AdminTheme.module.css";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { useAdminThemesContext } from "@/app/context/adminThemesProvider";
import { useAlert } from "@/app/context/AlertProvider";
import { THEME } from "@/constants/admin";

export default function ThemeUpdate() {
  const { setThemes } = useAdminThemesContext();
  const { workTheme } = useAdminWorkThemeContext();
  const alert = useAlert();
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
          alert(`Thème "${workTheme.name}" mis à jour`);
          if (workTheme.isActive) {
            setTimeout(function () {
              window.location.reload();
            }, 1500);
          } else {
            setThemes(themes);
          }
        } else alert("Erreur à la mise à jour du thème", true);
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
