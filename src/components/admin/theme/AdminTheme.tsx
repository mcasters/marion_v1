"use client";

import React from "react";
import themeStyle from "../../../styles/admin/AdminTheme.module.css";
import ThemeAdd from "@/components/admin/theme/ThemeAdd";
import ThemeDashboard from "@/components/admin/theme/ThemeDashboard";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import ThemeUpdate from "@/components/admin/theme/ThemeUpdate";
import CancelButton from "@/components/admin/form/CancelButton";
import { useAdminThemesContext } from "@/app/context/adminThemesProvider";
import { Theme } from "@prisma/client";
import { useAlert } from "@/app/context/AlertProvider";
import { THEME } from "@/constants/admin";
import s from "@/styles/admin/Admin.module.css";

export default function AdminTheme() {
  const { themes, setThemes } = useAdminThemesContext();
  const { workTheme, setWorkTheme } = useAdminWorkThemeContext();
  const alert = useAlert();

  const activateTheme = () => {
    fetch(`admin/api/theme/activate/${workTheme.id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const activatedTheme = json.activatedTheme;
        if (activatedTheme) {
          alert(`Thème "${activatedTheme.name}" actif`);
          setTimeout(function () {
            window.location.reload();
          }, 1500);
        } else alert("Erreur à l'activation du thème", true);
      });
  };

  const DeleteTheme = () => {
    if (confirm(`Supprimer le thème "${workTheme.name} ?`)) {
      fetch(`admin/api/theme/delete/${workTheme.id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.updatedThemes) {
            alert(`Thème "${workTheme.name}" supprimé`);

            setTimeout(function () {
              window.location.reload();
            }, 1500);
          }
        })
        .catch((e) => {
          alert("Erreur à la suppression du thème", true);
        });
    }
  };

  const handleCancel = () => {
    const themeBeforeChange = themes.find((t: Theme) => t.id === workTheme.id);
    if (themeBeforeChange) setWorkTheme(themeBeforeChange);
  };

  return (
    <>
      <h1>Gestion du thème</h1>
      <div className={themeStyle.themeContainer}>
        <h2>Liste des thèmes :</h2>
        <select
          name="name"
          value={workTheme.id}
          onChange={(e) => {
            const theme = themes.find(
              (t) => t.id?.toString() === e.target.value,
            );
            if (theme) setWorkTheme(theme);
          }}
          className={s.select}
        >
          {themes &&
            themes.map((t: Theme) => (
              <option key={t.id} value={t.id}>
                {`${t.name} ${t.isActive ? `(ACTIF)` : ""}`}
              </option>
            ))}
        </select>
        <button onClick={activateTheme} className="adminButton">
          Activer
        </button>
        <button
          disabled={workTheme.name === THEME.BASE_THEME}
          onClick={DeleteTheme}
          className="adminButton"
        >
          Supprimer
        </button>
      </div>
      <div className={themeStyle.themeContainer}>
        <h2>Thème sélectionné :</h2>
        <ThemeDashboard />
      </div>
      <div className={themeStyle.themeActionContainer}>
        <ThemeUpdate />
        <CancelButton onCancel={handleCancel} text="Annuler les changements" />
      </div>
      <div className={themeStyle.themeActionContainer}>
        <ThemeAdd />
      </div>
    </>
  );
}
