"use client";

import React from "react";
import themeStyle from "./adminTheme.module.css";
import ThemeAdd from "@/components/admin/theme/themeAdd";
import ThemeDashboard from "@/components/admin/theme/themeDashboard";
import ThemeUpdate from "@/components/admin/theme/themeUpdate";
import s from "@/components/admin/admin.module.css";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import PresetColorDashboard from "@/components/admin/theme/presetColor/presetColorDashboard";
import ThemeCancel from "@/components/admin/theme/themeCancel";
import ThemeActivate from "@/components/admin/theme/themeActivate";
import ThemeDelete from "@/components/admin/theme/themeDelete";
import ThemeSelect from "@/components/admin/theme/ThemeSelect";

export default function AdminTheme() {
  const { workTheme, themes } = useAdminWorkThemeContext();

  return (
    <>
      <h2 className={s.title2}>Gestion du thème</h2>
      <div className={themeStyle.themeContainer}>
        <h3 className={s.title3}>Thèmes :</h3>
        <ThemeSelect />
        <ThemeActivate />
        <ThemeDelete />
      </div>
      <div className={themeStyle.themeContainer}>
        <h3 className={s.title3}>Détail du thème sélectionné :</h3>
        <ThemeDashboard />
        <div className={themeStyle.actionContainer}>
          <ThemeAdd />
          <ThemeUpdate />
          <ThemeCancel />
        </div>
      </div>
      <div className={themeStyle.themeContainer}>
        <h3 className={s.title3}>Couleurs mémorisées</h3>
        <PresetColorDashboard />
      </div>
    </>
  );
}
