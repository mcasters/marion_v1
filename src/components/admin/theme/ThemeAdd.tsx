"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import s from "@/styles/admin/AdminTheme.module.css";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { useAdminThemesContext } from "@/app/context/adminThemesProvider";

export default function ThemeAdd() {
  const { setThemes } = useAdminThemesContext();
  const { workTheme, setWorkTheme } = useAdminWorkThemeContext();
  const [themeName, setThemeName] = useState<string>("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const themeToSave = Object.assign({}, workTheme, {
      name: themeName,
    });
    if (confirm("Tu confirmes ?")) {
      fetch("admin/api/theme/add", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(themeToSave),
      })
        .then((res) => res.json())
        .then((json) => {
          const themes = json.themes;
          const newTheme = json.newTheme;
          if (themes) {
            setThemes(themes);
            setWorkTheme(newTheme);
            setThemeName("");
            toast.success(`Thème "${themeName}" sauvegardé`);
          } else toast.error("Erreur à l'enregistrement du thème");
        });
    }
  };

  return (
    <form onSubmit={submit} className={s.themeActionContainer}>
      <input
        required
        className={s.themeInput}
        placeholder="Nom du nouveau thème"
        name="text"
        type="text"
        value={themeName}
        onChange={(e) => {
          setThemeName(e.target.value);
        }}
        style={{ marginRight: "0" }}
      />
      <button type="submit" className="adminButton" style={{ marginLeft: "0" }}>
        Mémoriser en nouveau thème
      </button>
    </form>
  );
}
