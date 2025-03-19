"use client";

import { PresetColor, Theme } from "@prisma/client";
import useModal from "@/components/admin/form/modal/useModal";
import Modal from "@/components/admin/form/modal/modal";
import React, { useEffect, useState } from "react";
import s from "@/styles/admin/adminTheme.module.css";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { colorNameToHex } from "@/utils/commonUtils";
import { useAlert } from "@/app/context/AlertProvider";
import { createPresetColor } from "@/app/actions/theme/admin";
import { OnlyString } from "@/lib/type";

interface Props {
  label: string;
  colorLabel: string;
  pageTypeName: string;
  presetColors: PresetColor[];
  deletedPresetColor: PresetColor | null;
}

export default function ColorPicker({
  label, // what is displayed
  colorLabel,
  pageTypeName,
  presetColors,
  deletedPresetColor,
}: Props) {
  const { workTheme, setWorkTheme } = useAdminWorkThemeContext();
  const { isOpen, toggle } = useModal();
  const alert = useAlert();
  const [color, setColor] = useState<string>(
    workTheme[colorLabel as keyof OnlyString<Theme>],
  );
  const [nameToSave, setNameToSave] = useState<string>("");

  useEffect(() => {
    setColor(workTheme[colorLabel as keyof OnlyString<Theme>]);
  }, [workTheme, colorLabel]);

  useEffect(() => {
    if (deletedPresetColor && deletedPresetColor.name === color)
      setColor(deletedPresetColor.color);
  }, [deletedPresetColor, color]);

  const onAddPresetColor = async () => {
    const res = await createPresetColor(nameToSave, color);
    alert(res.message, res.isError);
    setWorkTheme({ ...workTheme, [colorLabel]: nameToSave } as Theme);
    setColor(nameToSave);
    setNameToSave("");
  };

  const onSelectPresetColor = (colorName: string): void => {
    setWorkTheme({ ...workTheme, [colorLabel]: colorName } as Theme);
  };

  const handleChange = (color: string): void => {
    setColor(color);
  };

  const updateWorkTheme = () => {
    setWorkTheme({ ...workTheme, [colorLabel]: color } as Theme);
    toggle();
  };

  return (
    <div className={s.colorContainer}>
      <div className={s.colorPickerContainer}>
        <button
          className={
            isOpen
              ? `${s.swatch} ${s.open}`
              : color.charAt(0) !== "#"
                ? `${s.swatch} ${s.focus}`
                : s.swatch
          }
          style={{
            backgroundColor: colorNameToHex(color, presetColors),
          }}
          onClick={(e) => {
            e.preventDefault();
            toggle();
          }}
        />
        <Modal isOpen={isOpen} toggle={toggle}>
          <div className={s.colorPicker}>
            <h2>{pageTypeName}</h2>
            <p className={s.subtitle}>{label}</p>
            <div className={s.picker}>
              <HexColorPicker
                color={colorNameToHex(color, presetColors)}
                onChange={handleChange}
                style={{ width: "250px" }}
              />
            </div>
            <p>Couleur sélectionnée (notation hexadécimale) :</p>
            <div>
              <div
                className={s.halfWidth}
                style={{
                  backgroundColor: colorNameToHex(color, presetColors),
                }}
              ></div>
              <HexColorInput
                color={colorNameToHex(color, presetColors)}
                onChange={handleChange}
                prefixed={true}
                className={s.halfWidth}
              />
            </div>
            <div className={s.presetColorForm}>
              <input
                className={s.halfWidth}
                placeholder="Nom de la couleur"
                value={nameToSave}
                onChange={(e) => setNameToSave(e.target.value)}
              />
              <button
                onClick={onAddPresetColor}
                className={`${s.halfWidth}`}
                disabled={nameToSave === ""}
              >
                Mémoriser la couleur
              </button>
            </div>
            <div className={s.pickerSwatches}>
              {presetColors?.map((p) => (
                <div key={p.id} className={s.presetColorContainer}>
                  <button
                    className={
                      p.name ===
                        workTheme[colorLabel as keyof OnlyString<Theme>] &&
                      p.color === colorNameToHex(color, presetColors)
                        ? `${s.swatch} ${s.focus}`
                        : s.swatch
                    }
                    style={{
                      background: p.color,
                    }}
                    onClick={() => onSelectPresetColor(p.name)}
                  />
                  <p>{p.name}</p>
                </div>
              ))}
            </div>
            <button className={s.halfWidth} onClick={updateWorkTheme}>
              OK
            </button>
            <button
              onClick={() => {
                setColor(workTheme[colorLabel as keyof OnlyString<Theme>]);
                toggle();
              }}
              className={s.halfWidth}
            >
              Annuler
            </button>
          </div>
        </Modal>
      </div>
      <p className={s.label}>{label}</p>
    </div>
  );
}
