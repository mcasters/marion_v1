"use client";

import React from "react";
import s from "../adminTheme.module.css";
import { THEME_ENHANCED_LABEL } from "@/constants/admin";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { getEnhancedTheme } from "@/utils/themeUtils";
import SubDashboard from "@/components/admin/theme/dashboard/subDashboard";

export default function Dashboard() {
  const { workTheme, isUpdated } = useAdminWorkThemeContext();
  const workThemeEnhanced = getEnhancedTheme(workTheme);

  return (
    <div className={`${s.flex} ${isUpdated ? "" : s.toUpdate}`}>
      <section>
        <h4 className={s.sectionTitle}>{THEME_ENHANCED_LABEL.general}</h4>
        <SubDashboard
          themeEnhanced={workThemeEnhanced}
          keySection={"general"}
        />
      </section>
      <section>
        <h4 className={s.sectionTitle}>{THEME_ENHANCED_LABEL.home}</h4>
        <SubDashboard themeEnhanced={workThemeEnhanced} keySection={"home"} />
      </section>
      <section>
        <h4 className={s.sectionTitle}>{THEME_ENHANCED_LABEL.other}</h4>
        <SubDashboard themeEnhanced={workThemeEnhanced} keySection={"other"} />
      </section>
      <section>
        <h4 className={s.sectionTitle}>{THEME_ENHANCED_LABEL.item}</h4>
        <SubDashboard themeEnhanced={workThemeEnhanced} keySection={"item"} />
      </section>
      <p>* lorsque la souris survole le texte</p>
      {isUpdated && <span>Thème modifié (à sauvegarder)</span>}
    </div>
  );
}
