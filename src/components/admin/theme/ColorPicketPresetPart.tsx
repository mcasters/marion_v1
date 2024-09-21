"use client";

import React, { useState } from "react";
import s from "@/styles/admin/AdminTheme.module.css";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { OnlyString } from "@/lib/db/theme";
import { Theme } from "@prisma/client";
import { useAdminPresetColorsContext } from "@/app/context/adminPresetColorsProvider";

interface Props {
  colorLabel: string;
  onChange: (colorName: string) => void;
  onSave: (colorName: string) => void;
}

export default function ColorPickerPresetPart({
  colorLabel,
  onChange,
  onSave,
}: Props) {
  const { workTheme } = useAdminWorkThemeContext();
  const { presetColors } = useAdminPresetColorsContext();
  const [nameToSave, setNameToSave] = useState<string>("");

  const handleSave = () => {
    onSave(nameToSave);
    setNameToSave("");
  };
  return (
    <>
      <div className={s.presetColorForm}>
        <input
          className={s.halfWidth}
          placeholder="Nom de la couleur"
          value={nameToSave}
          onChange={(e) => setNameToSave(e.target.value)}
        />
        <button
          onClick={handleSave}
          className={`${s.halfWidth} adminButton`}
          disabled={nameToSave === ""}
        >
          Mémoriser la couleur
        </button>
      </div>
      <div className={s.pickerSwatches}>
        {presetColors.map((p) => (
          <div key={p.id} className={s.presetColorContainer}>
            <button
              className={
                p.name === workTheme[colorLabel as keyof OnlyString<Theme>]
                  ? s.swatchFocus
                  : s.swatch
              }
              style={{
                background: p.color,
              }}
              onClick={(e) => {
                e.preventDefault();
                onChange(p.name);
              }}
            />
            <p className={s.colorName}>{p.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
