"use client";

import { Theme } from "@prisma/client";
import useModal from "@/components/admin/form/modal/useModal";
import Modal from "@/components/admin/form/modal/Modal";
import React from "react";
import s from "@/styles/admin/AdminTheme.module.css";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { OnlyString } from "@/lib/db/theme";
import { colorNameToHex } from "@/utils/commonUtils";
import ColorPickerPresetColor from "@/components/admin/theme/ColorPicketPresetPart";
import toast from "react-hot-toast";
import { useAdminPresetColorsContext } from "@/app/context/adminPresetColorsProvider";

interface Props {
  label: string;
  colorLabel: string;
  pageTypeName: string;
}

export default function ColorPicker({
  label, // title displayed
  colorLabel, // key name in theme object
  pageTypeName,
}: Props) {
  const { workTheme, setWorkTheme } = useAdminWorkThemeContext();
  const { presetColors, setPresetColors } = useAdminPresetColorsContext();
  const { isOpen, toggle } = useModal();

  const handleChange = (color: string): void => {
    const updatedWorkTheme = { ...workTheme };
    updatedWorkTheme[colorLabel as keyof OnlyString<Theme>] = color;
    setWorkTheme(updatedWorkTheme);
  };

  const addPresetColor = (colorName: string) => {
    fetch("admin/api/theme/preset-color/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: colorName,
        color: workTheme[colorLabel as keyof OnlyString<Theme>],
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        const updatedPresetColors = json.updatedPresetColors;
        if (updatedPresetColors) {
          setPresetColors(updatedPresetColors);
          handleChange(colorName);
          toast.success("Couleur perso enregistrée");
        } else toast.error(`Erreur à l'enregistrement`);
      });
  };

  return (
    <div key={label}>
      <div className={s.colorContainer}>
        <p className={s.label}>{label}</p>
        <div className={s.colorPickerContainer}>
          <button
            className={
              isOpen
                ? s.swatchOpen
                : workTheme[colorLabel as keyof OnlyString<Theme>].charAt(0) !==
                    "#"
                  ? s.swatchFocus
                  : s.swatch
            }
            style={{
              backgroundColor: colorNameToHex(
                workTheme[colorLabel as keyof OnlyString<Theme>],
                presetColors,
              ),
            }}
            onClick={(e) => {
              e.preventDefault();
              toggle();
            }}
          />
          <Modal isOpen={isOpen} toggle={toggle}>
            <div className={s.colorPicker}>
              <h3>
                {pageTypeName} : {label}
              </h3>
              <div className={s.picker}>
                <HexColorPicker
                  color={colorNameToHex(
                    workTheme[colorLabel as keyof OnlyString<Theme>],
                    presetColors,
                  )}
                  onChange={handleChange}
                />
              </div>
              <p>Couleur sélectionnée (notation hexadécimale) :</p>
              <div>
                <div
                  className={s.halfWidth}
                  style={{
                    backgroundColor: colorNameToHex(
                      workTheme[colorLabel as keyof OnlyString<Theme>],
                      presetColors,
                    ),
                  }}
                ></div>
                <HexColorInput
                  color={colorNameToHex(
                    workTheme[colorLabel as keyof OnlyString<Theme>],
                    presetColors,
                  )}
                  onChange={handleChange}
                  prefixed={true}
                  className={s.halfWidth}
                />
              </div>
              <ColorPickerPresetColor
                colorLabel={colorLabel}
                onChange={handleChange}
                onSave={addPresetColor}
              />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
