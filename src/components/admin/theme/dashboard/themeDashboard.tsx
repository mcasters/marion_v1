"use client";

import React, { Fragment } from "react";
import s from "../adminTheme.module.css";
import {
  PAGE_TYPE,
  THEME_ENHANCED_LABEL,
  THEME_PAGE_PART_LABEL,
  THEME_TARGET_LABEL,
} from "@/constants/admin";
import ColorSwatch from "@/components/admin/theme/dashboard/colorSwatch";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { getEnhancedTheme } from "@/utils/themeUtils";
import { ThemePagePart, ThemeTarget } from "@/lib/type";

export default function ThemeDashboard() {
  const { workTheme, isUpdated } = useAdminWorkThemeContext();
  const workThemeEnhanced = getEnhancedTheme(workTheme);

  return (
    <div className={`${s.flex} ${isUpdated ? "" : s.toUpdate}`}>
      <section>
        <h4 className={s.sectionTitle}>{PAGE_TYPE.GENERAL}</h4>
        {Object.entries(workThemeEnhanced).map(([key, value], i) => {
          if (key === "lineColor" || key === "titleColor")
            return (
              <ColorSwatch
                key={i}
                label={`${THEME_ENHANCED_LABEL[key]}`}
                dbLabel={key}
                pageTypeName={PAGE_TYPE.GENERAL}
              />
            );
        })}
      </section>
      <section>
        <h4 className={s.sectionTitle}>{PAGE_TYPE.HOME}</h4>
        {Object.entries(workThemeEnhanced["home"]).map(
          ([pagePart, content], i) =>
            Object.entries(content).map(([target, value], ii) => (
              <Fragment key={`${i}-${ii}`}>
                {i !== 0 && ii === 0 && <br />}
                {value !== "" && (
                  <ColorSwatch
                    label={`${THEME_PAGE_PART_LABEL[pagePart as keyof ThemePagePart]} - ${THEME_TARGET_LABEL[target as keyof ThemeTarget]}`}
                    dbLabel={`${pagePart}_${target}_home`}
                    pageTypeName={PAGE_TYPE.HOME}
                  />
                )}
              </Fragment>
            )),
        )}
      </section>
      <section>
        <h4 className={s.sectionTitle}>{PAGE_TYPE.OTHERS}</h4>
        {Object.entries(workThemeEnhanced["other"]).map(
          ([pagePart, content], i) =>
            Object.entries(content).map(([target, value], ii) => (
              <Fragment key={`${i}-${ii}`}>
                {i !== 0 && ii === 0 && <br />}
                {value !== "" && (
                  <ColorSwatch
                    label={`${THEME_PAGE_PART_LABEL[pagePart as keyof ThemePagePart]} - ${THEME_TARGET_LABEL[target as keyof ThemeTarget]}`}
                    dbLabel={`${pagePart}_${target}_other`}
                    pageTypeName={PAGE_TYPE.HOME}
                  />
                )}
              </Fragment>
            )),
        )}
      </section>
      <section>
        <h4 className={s.sectionTitle}>{PAGE_TYPE.ITEM}</h4>
        {Object.entries(workThemeEnhanced["item"]).map(
          ([pagePart, content], i) =>
            Object.entries(content).map(([target, value], ii) => (
              <Fragment key={`${i}-${ii}`}>
                {i !== 0 && ii === 0 && <br />}
                {value !== "" && (
                  <ColorSwatch
                    label={`${THEME_PAGE_PART_LABEL[pagePart as keyof ThemePagePart]} - ${THEME_TARGET_LABEL[target as keyof ThemeTarget]}`}
                    dbLabel={`${pagePart}_${target}_item`}
                    pageTypeName={PAGE_TYPE.HOME}
                  />
                )}
              </Fragment>
            )),
        )}
      </section>
      <p>* lorsque la souris survole le texte</p>
      {isUpdated && <span>Thème modifié (à sauvegarder)</span>}
    </div>
  );
}
