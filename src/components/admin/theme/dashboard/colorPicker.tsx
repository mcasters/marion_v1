"use client";

import React, { useEffect, useState } from "react";
import s from "@/components/admin/theme/adminTheme.module.css";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";

import { colorNameToHex } from "@/utils/themeUtils";

interface Props {
  color: string;
  onColorChange: (color: string) => void;
  onCreatePresetColor: (nameColor: string, hexColor: string) => void;
  onClose: () => void;
  onCancel: () => void;
  title: string;
}

export default function ColorPicker({
  color,
  onColorChange,
  onCreatePresetColor,
  onClose,
  onCancel,
  title,
}: Props) {
  const { workTheme, presetColors } = useAdminWorkThemeContext();
  const isPresetColor = !color.startsWith("#");
  const hexColor = colorNameToHex(color, presetColors);
  const [_nameColor, set_nameColor] = useState<string>("");
  const [isColorChanged, setIsColorChanged] = useState<boolean>(false);

  useEffect(() => {
    set_nameColor(isPresetColor ? color : "");
  }, [workTheme]);

  const handleColorChange = (color: string) => {
    if (color.startsWith("#")) {
      set_nameColor("");
      setIsColorChanged(true);
    } else setIsColorChanged(false);
    onColorChange(color);
  };

  return (
    <div className={s.colorPicker}>
      <h2>{title}</h2>
      <div className={s.picker}>
        <HexColorPicker
          color={hexColor}
          onChange={handleColorChange}
          style={{ width: "250px" }}
        />
      </div>
      <p>Couleur sélectionnée (notation hexadécimale) :</p>
      <div>
        <div
          className={s.halfWidth}
          style={{ backgroundColor: hexColor }}
        ></div>
        <HexColorInput
          color={hexColor}
          onChange={handleColorChange}
          prefixed={true}
          className={s.halfWidth}
        />
      </div>
      <div className={s.presetColorForm}>
        <input
          className={s.halfWidth}
          placeholder="Nom de la couleur"
          value={_nameColor}
          onChange={(e) => set_nameColor(e.target.value)}
        />
        <button
          onClick={() => onCreatePresetColor(_nameColor, hexColor)}
          className={s.halfWidth}
          disabled={
            _nameColor === "" ||
            _nameColor === color ||
            (!isColorChanged && isPresetColor)
          }
        >
          Mémoriser la couleur
        </button>
      </div>
      <div className={s.pickerSwatches}>
        {presetColors?.map((p) => (
          <div key={p.id} className={s.presetColorContainer}>
            <button
              className={
                p.name === color ? `${s.swatch} ${s.isPresetColor}` : s.swatch
              }
              style={{
                background: p.color,
              }}
              onClick={() => handleColorChange(p.name)}
            />
            <p>{p.name}</p>
          </div>
        ))}
      </div>
      <button className={s.halfWidth} onClick={onClose}>
        OK
      </button>
      <button onClick={onCancel} className={s.halfWidth}>
        Annuler
      </button>
    </div>
  );
}
