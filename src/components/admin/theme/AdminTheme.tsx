"use client";

import React, { useState, useTransition } from "react";
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
import PresetColorDashboard from "@/components/admin/theme/presetColor/PresetColorDashboard";
import { NOTES, TEXTS } from "@/constants/specific";

type Props = {
  themes: Theme[];
  presetColors: PresetColor[];
};

export default function AdminTheme({ themes, presetColors }: Props) {
  const { workTheme, setWorkTheme } = useAdminWorkThemeContext();
  const [deletedPresetColor, setDeletedPresetColor] =
    useState<PresetColor | null>(null);
  const alert = useAlert();
  const [, startTransition] = useTransition();
  const savedWorkTheme = themes.find((t) => t.id === workTheme.id);

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
      <h1 className={s.pageTitle}>Gestion du thème</h1>
      <div className={themeStyle.themeContainer}>
        <h2>Thèmes :</h2>
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
        <ThemeDashboard
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
          isToUpdate={
            workTheme.name != THEME.BASE_THEME &&
            savedWorkTheme !== undefined &&
            Object.entries(workTheme).sort().toString() !=
              Object.entries(savedWorkTheme).sort().toString()
          }
        />
      </div>
      <div className={themeStyle.actionContainer}>
        <div className={themeStyle.actionPartContainer}>
          <ThemeAdd themes={themes} />
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
      <div className={themeStyle.themeContainer}>
        <h2>Couleurs personnalisées</h2>
        <PresetColorDashboard
          presetColors={presetColors}
          onDeletePresetColor={setDeletedPresetColor}
        />
      </div>
      {TEXTS.TITLE === "Thierry Casters" && (
        <section className={themeStyle.noteContainer}>
          <h2>Notes</h2>
          <p>Mise à jour : {NOTES.Date}</p>
          <div className={themeStyle.grid}>
            {Object.entries(NOTES).map(([key, value]) => {
              if (key !== "Date")
                return (
                  <div key={key}>
                    <h3 className={themeStyle.sectionTitle}>{key}</h3>
                    <p>{value}</p>
                  </div>
                );
            })}
          </div>
        </section>
      )}
    </>
  );
}
