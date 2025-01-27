"use client";

import { PresetColor, Theme } from "@prisma/client";
import useModal from "@/components/admin/form/modal/useModal";
import Modal from "@/components/admin/form/modal/Modal";
import React, { useTransition } from "react";
import s from "@/styles/admin/AdminTheme.module.css";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { OnlyString } from "@/lib/db/theme";
import { colorNameToHex } from "@/utils/commonUtils";
import ColorPickerPresetPart from "@/components/admin/theme/presetColor/ColorPicketPresetPart";
import { useAlert } from "@/app/context/AlertProvider";
import { createPresetColor } from "@/app/actions/theme/admin";

interface Props {
  label: string;
  colorLabel: string;
  pageTypeName: string;
  presetColors: PresetColor[];
}

export default function ColorPicker({
  label, // title displayed
  colorLabel, // key name in theme object
  pageTypeName,
  presetColors,
}: Props) {
  const { workTheme, setWorkTheme } = useAdminWorkThemeContext();
  const { isOpen, toggle } = useModal();
  const alert = useAlert();
  const [, startTransition] = useTransition();

  const onAddPresetColor = (name) => {
    startTransition(async () => {
      const res = await createPresetColor(
        name,
        workTheme[colorLabel as keyof OnlyString<Theme>],
      );
      toggle();
      alert(res.message, res.isError);
    });
  };

  const handleChange = (color: string): void => {
    const updatedWorkTheme = { ...workTheme };
    updatedWorkTheme[colorLabel as keyof OnlyString<Theme>] = color;
    setWorkTheme(updatedWorkTheme);
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
              <ColorPickerPresetPart
                colorLabel={colorLabel}
                onChange={handleChange}
                onSave={onAddPresetColor}
                presetColors={presetColors}
              />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
