"use client";

import React, { Fragment } from "react";
import s from "../adminTheme.module.css";
import {
  THEME_ENHANCED_LABEL,
  THEME_GENERAL_LABEL,
  THEME_PAGE_PART_LABEL,
  THEME_TARGET_LABEL,
} from "@/constants/admin";
import ColorSwatch from "@/components/admin/theme/dashboard/colorSwatch";
import {
  ThemeEnhanced,
  ThemeGeneral,
  ThemePagePart,
  ThemeTarget,
} from "@/lib/type";

interface Props {
  themeEnhanced: ThemeEnhanced;
  keySection: keyof ThemeEnhanced;
}

export default function SubDashboard({ themeEnhanced, keySection }: Props) {
  if (keySection === "general") {
    console.log(themeEnhanced[keySection]);
    return Object.entries(themeEnhanced[keySection]).map(
      ([target, value], i) => (
        <ColorSwatch
          key={i}
          label={`${THEME_GENERAL_LABEL[target as keyof ThemeGeneral]}`}
          dbLabel={`${target}_${keySection}`}
          pageTypeName={THEME_ENHANCED_LABEL.general}
        />
      ),
    );
  } else
    return Object.entries(themeEnhanced[keySection]).map(
      ([pagePart, content], i) => (
        <div key={i} className={s.subSection}>
          {Object.entries(content).map(([target, value], ii) => (
            <Fragment key={ii}>
              {ii === 0 && (
                <h5 className={s.subTitle}>
                  {THEME_PAGE_PART_LABEL[pagePart as keyof ThemePagePart]} :
                </h5>
              )}
              {value !== "" && (
                <ColorSwatch
                  label={`${THEME_TARGET_LABEL[target as keyof ThemeTarget]}`}
                  dbLabel={`${pagePart}_${target}_${keySection}`}
                  pageTypeName={THEME_ENHANCED_LABEL[keySection]}
                />
              )}
            </Fragment>
          ))}
        </div>
      ),
    );
}
