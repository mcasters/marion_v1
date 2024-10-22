"use client";

import React from "react";
import themeStyle from "../../../styles/admin/AdminTheme.module.css";
import ThemeAdd from "@/components/admin/theme/ThemeAdd";
import { THEME } from "@/constants/database";
import ThemeDashboard from "@/components/admin/theme/ThemeDashboard";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import ThemeUpdate from "@/components/admin/theme/ThemeUpdate";
import CancelButton from "@/components/admin/form/CancelButton";
import { useAdminThemesContext } from "@/app/context/adminThemesProvider";
import { Theme } from "@prisma/client";
import { useAlert } from "@/app/context/AlertProvider";

export default function AdminTheme() {
  const { themes, setThemes } = useAdminThemesContext();
  const { workTheme, setWorkTheme } = useAdminWorkThemeContext();
  const alert = useAlert();

  const changeSelectedId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme: Theme | undefined = themes.find(
      (t) => t.id.toString() === e.target.value,
    );
    if (selectedTheme !== undefined) setWorkTheme({ ...selectedTheme });
  };

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
    if (
      confirm(
        `As-tu vraiment confiance ??? ... Plutôt que de supprimer le thème "${workTheme.name}", ça pourrait supprimer l'intégralité du contenu de ton ordinateur !`,
      )
    ) {
      fetch(`admin/api/theme/delete/${workTheme.id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          const updatedThemes: Theme[] = json.updatedThemes;
          if (updatedThemes) {
            setThemes(updatedThemes);
            alert(`Thème "${workTheme.name}" supprimé`);
            if (workTheme.isActive) {
              setTimeout(function () {
                window.location.reload();
              }, 1500);
            } else {
              const activeTheme = updatedThemes.find((t: Theme) => t.isActive);
              if (activeTheme) setWorkTheme({ ...activeTheme });
            }
          } else alert("Erreur à la suppression du thème", true);
        });
    }
  };

  const handleCancel = () => {
    const themeBeforeChange = themes.find((t: Theme) => t.id === workTheme.id);
    if (themeBeforeChange !== undefined) setWorkTheme({ ...themeBeforeChange });
  };

  return (
    <>
      <h1>Gestion du thème</h1>
      <div className={themeStyle.themeContainer}>
        <h2>Liste des thèmes :</h2>
        <select name="name" value={workTheme.id} onChange={changeSelectedId}>
          {themes.map((t: Theme) => (
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
