"use client";

import React, { useState } from "react";
import themeStyle from "../../../styles/admin/AdminTheme.module.css";
import ThemeAdd from "@/components/admin/theme/ThemeAdd";
import ThemeDashboard from "@/components/admin/theme/ThemeDashboard";
import ThemeUpdate from "@/components/admin/theme/ThemeUpdate";
import CancelButton from "@/components/admin/form/CancelButton";
import { PresetColor, Theme } from "@prisma/client";
import { useAlert } from "@/app/context/AlertProvider";
import { THEME } from "@/constants/admin";
import s from "@/styles/admin/admin.module.css";
import { activateTheme, deleteTheme } from "@/app/actions/theme/admin";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import PresetColorDashboard from "@/components/admin/theme/presetColor/PresetColorDashboard";
import { removeProperty } from "@/utils/commonUtils";

type Props = {
  themes: Theme[];
  presetColors: PresetColor[];
};

export default function AdminTheme({ themes, presetColors }: Props) {
  const { workTheme, setWorkTheme } = useAdminWorkThemeContext();
  const [deletedPresetColor, setDeletedPresetColor] =
    useState<PresetColor | null>(null);
  const alert = useAlert();
  const dbTheme = themes.find((t) => t.id === workTheme.id);

  const onDeleteTheme = async () => {
    const res = await deleteTheme(workTheme.id);
    const theme = themes.find((t) => t.isActive);
    if (theme) setWorkTheme(theme);
    alert(res.message, res.isError);
  };

  const onActivateTheme = async () => {
    setWorkTheme({ ...workTheme, isActive: true } as Theme);
    const res = await activateTheme(workTheme.id);
    alert(res.message, res.isError);
  };

  const handleCancel = () => {
    const themeBeforeChange = themes.find((t: Theme) => t.id === workTheme.id);
    if (themeBeforeChange) setWorkTheme(themeBeforeChange);
  };

  return (
    <>
      <h2 className={s.title2}>Gestion du thème</h2>
      <div className={themeStyle.themeContainer}>
        <h3 className={s.title3}>Thèmes :</h3>
        <select
          name="name"
          value={workTheme.id}
          onChange={(e) => {
            setWorkTheme(
              themes.find((t) => t.id?.toString() === e.target.value) as Theme,
            );
          }}
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
        <h3 className={s.title3}>Détail du thème sélectionné :</h3>
        <ThemeDashboard
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
          isToUpdate={
            dbTheme !== undefined &&
            Object.entries(removeProperty("isActive", workTheme))
              .sort()
              .toString() !=
              Object.entries(removeProperty("isActive", dbTheme))
                .sort()
                .toString()
          }
        />
        <div className={themeStyle.actionContainer}>
          <div className={themeStyle.actionPartContainer}>
            <ThemeAdd />
          </div>
          <div className={themeStyle.actionPartContainer}>
            <ThemeUpdate />
          </div>
          <div className={themeStyle.actionPartContainer}>
            <CancelButton
              onCancel={handleCancel}
              text="Annuler les changements"
            />
          </div>
        </div>
      </div>
      <div className={themeStyle.themeContainer}>
        <h3 className={s.title3}>Couleurs mémorisées</h3>
        <PresetColorDashboard
          presetColors={presetColors}
          onDeletePresetColor={setDeletedPresetColor}
        />
      </div>
    </>
  );
}
