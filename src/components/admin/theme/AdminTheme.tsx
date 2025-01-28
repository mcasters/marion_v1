"use client";

import React, { useTransition } from "react";
import themeStyle from "../../../styles/admin/AdminTheme.module.css";
import ThemeAdd from "@/components/admin/theme/ThemeAdd";
import ThemeDashboard from "@/components/admin/theme/ThemeDashboard";
import ThemeUpdate from "@/components/admin/theme/ThemeUpdate";
import CancelButton from "@/components/admin/form/CancelButton";
import { PresetColor, Theme } from "@prisma/client";
import { useAlert } from "@/app/context/AlertProvider";
import { THEME } from "@/constants/admin";
import s from "@/styles/admin/Admin.module.css";
import { activateTheme, deleteTheme } from "@/app/actions/theme/admin";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";

type Props = {
  themes: Theme[];
  presetColors: PresetColor[];
};

export default function AdminTheme({ themes, presetColors }: Props) {
  const { workTheme, setWorkTheme } = useAdminWorkThemeContext();
  const alert = useAlert();
  const [, startTransition] = useTransition();

  const onDeleteTheme = () => {
    startTransition(async () => {
      const res = await deleteTheme(workTheme.id);
      const theme = themes.find((t) => t.isActive);
      if (theme) setWorkTheme(theme);
      alert(res.message, res.isError);
    });
  };

  const onActivateTheme = () => {
    startTransition(async () => {
      const res = await activateTheme(workTheme.id);
      alert(res.message, res.isError);
    });
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
            setWorkTheme(
              themes.find((t) => t.id?.toString() === e.target.value) as Theme,
            );
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
        <button onClick={onActivateTheme} className="adminButton">
          Activer
        </button>
        <button
          disabled={workTheme.name === THEME.BASE_THEME}
          onClick={onDeleteTheme}
          className="adminButton"
        >
          Supprimer
        </button>
      </div>
      <div className={themeStyle.themeContainer}>
        <h2>Détail du thème sélectionné :</h2>
        <ThemeDashboard presetColors={presetColors} />
      </div>
      <div className={themeStyle.themeActionContainer}>
        <ThemeUpdate />
        <CancelButton onCancel={handleCancel} text="Annuler les changements" />
      </div>
      <div className={themeStyle.themeActionContainer}>
        <ThemeAdd themes={themes} />
      </div>
    </>
  );
}
