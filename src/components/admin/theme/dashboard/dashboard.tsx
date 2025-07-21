"use client";

import React from "react";
import s from "../adminTheme.module.css";
import { THEME_PAGE_LABEL } from "@/constants/admin";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { getStructuredTheme } from "@/lib/utils/themeUtils";
import SubDashboard from "@/components/admin/theme/dashboard/subDashboard";

export default function Dashboard() {
  const { workTheme, isChanged } = useAdminWorkThemeContext();
  const structuredTheme = getStructuredTheme(workTheme);

  return (
    <>
      <div className={`${s.dashboard} ${isChanged ? undefined : s.toUpdate}`}>
        <section>
          <h4 className={s.sectionTitle}>{THEME_PAGE_LABEL.general}</h4>
          <SubDashboard structuredTheme={structuredTheme} page={"general"} />
        </section>
        <section>
          <h4 className={s.sectionTitle}>{THEME_PAGE_LABEL.home}</h4>
          <SubDashboard structuredTheme={structuredTheme} page={"home"} />
        </section>
        <section>
          <h4 className={s.sectionTitle}>{THEME_PAGE_LABEL.other}</h4>
          <SubDashboard structuredTheme={structuredTheme} page={"other"} />
        </section>
        <section>
          <h4 className={s.sectionTitle}>{THEME_PAGE_LABEL.work}</h4>
          <SubDashboard structuredTheme={structuredTheme} page={"work"} />
        </section>
        <p>* lorsque la souris survole le texte</p>
      </div>
      {!isChanged && (
        <div className={s.message}>Thème modifié (à sauvegarder)</div>
      )}
    </>
  );
}
