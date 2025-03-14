"use client";

import ColorPicker from "@/components/admin/theme/ColorPicker";
import React from "react";
import s from "../../../styles/admin/AdminTheme.module.css";
import { PresetColor } from "@prisma/client";
import { PAGE_TYPE, THEME_DATAS } from "@/constants/admin";

type Props = {
  presetColors: PresetColor[];
  deletedPresetColor: PresetColor | null;
  isToUpdate: boolean;
};

export default function ThemeDashboard({
  presetColors,
  deletedPresetColor,
  isToUpdate,
}: Props) {
  return (
    <div className={`${s.flex} ${isToUpdate ? s.toUpdate : ""}`}>
      <section>
        <h4 className={s.sectionTitle}>{PAGE_TYPE.GENERAL}</h4>
        {Object.entries(THEME_DATAS).map(
          ([colorLabel, { label, pageType }], i) => {
            console.log(colorLabel);
            if (pageType === PAGE_TYPE.GENERAL)
              return (
                <ColorPicker
                  key={i}
                  label={label}
                  colorLabel={colorLabel}
                  pageTypeName={pageType}
                  presetColors={presetColors}
                  deletedPresetColor={deletedPresetColor}
                />
              );
          },
        )}
      </section>
      <section>
        <h4 className={s.sectionTitle}>{PAGE_TYPE.HOME}</h4>
        {Object.entries(THEME_DATAS).map(
          ([colorLabel, { label, pageType }], i) => {
            if (pageType === PAGE_TYPE.HOME)
              return (
                <ColorPicker
                  key={i}
                  label={label}
                  colorLabel={colorLabel}
                  pageTypeName={pageType}
                  presetColors={presetColors}
                  deletedPresetColor={deletedPresetColor}
                />
              );
          },
        )}
      </section>
      <section>
        <h4 className={s.sectionTitle}>{PAGE_TYPE.OTHERS}</h4>
        {Object.entries(THEME_DATAS).map(
          ([colorLabel, { label, pageType }], i) => {
            if (pageType === PAGE_TYPE.OTHERS)
              return (
                <ColorPicker
                  key={i}
                  label={label}
                  colorLabel={colorLabel}
                  pageTypeName={pageType}
                  presetColors={presetColors}
                  deletedPresetColor={deletedPresetColor}
                />
              );
          },
        )}
      </section>
      <section>
        <h4 className={s.sectionTitle}>{PAGE_TYPE.ITEM}</h4>
        {Object.entries(THEME_DATAS).map(
          ([colorLabel, { label, pageType }], i) => {
            if (pageType === PAGE_TYPE.ITEM)
              return (
                <ColorPicker
                  key={i}
                  label={label}
                  colorLabel={colorLabel}
                  pageTypeName={pageType}
                  presetColors={presetColors}
                  deletedPresetColor={deletedPresetColor}
                />
              );
          },
        )}
      </section>
      <p>* lorsque la souris survole le texte</p>
      {isToUpdate && <span>Thème modifié (à sauvegarder)</span>}
    </div>
  );
}
