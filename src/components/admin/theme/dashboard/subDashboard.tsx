"use client";

import React, { Fragment } from "react";
import s from "../adminTheme.module.css";
import { THEME_PAGE_PART_LABEL } from "@/constants/admin";
import ColorSwatch from "@/components/admin/theme/dashboard/colorSwatch";
import { StructuredTheme, ThemePagePart } from "@/lib/type";

interface Props {
  structuredTheme: StructuredTheme;
  page: keyof StructuredTheme;
}

export default function SubDashboard({ structuredTheme, page }: Props) {
  if (page === "general") {
    return Object.entries(structuredTheme[page]).map(([target, value], i) => (
      <ColorSwatch key={i} page={page} pagePart={null} target={target} />
    ));
  } else
    return Object.entries(structuredTheme[page]).map(
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
                <ColorSwatch page={page} pagePart={pagePart} target={target} />
              )}
            </Fragment>
          ))}
        </div>
      ),
    );
}
