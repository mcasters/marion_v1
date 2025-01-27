"use client";

import s from "@/styles/admin/AdminTheme.module.css";
import React, { useEffect, useState, useTransition } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import Modal from "@/components/admin/form/modal/Modal";
import useModal from "@/components/admin/form/modal/useModal";
import { PresetColor, Theme } from "@prisma/client";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { useAlert } from "@/app/context/AlertProvider";
import {
  deletePresetColor,
  updatePresetColor,
} from "@/app/actions/theme/admin";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { BASE_PRESET_COLOR } from "@/constants/specific";

interface Props {
  presetColor: PresetColor;
  themes: Theme[];
}

export default function PresetColorPicker({ presetColor, themes }: Props) {
  const { workTheme, setWorkTheme } = useAdminWorkThemeContext();
  const { isOpen, toggle } = useModal();
  const alert = useAlert();
  const [color, setColor] = useState<string>(presetColor.color);
  const [, startTransition] = useTransition();

  const onDeletePresetColor = () => {
    startTransition(async () => {
      const res = await deletePresetColor(presetColor.id);
      alert(res.message, res.isError);
    });
  };

  useEffect(() => {
    const updatedTheme = themes.find((t) => t.id === workTheme.id);
    if (updatedTheme) setWorkTheme(updatedTheme);
  }, [themes]);

  const onUpdatePresetColor = () => {
    startTransition(async () => {
      const res = await updatePresetColor({
        ...presetColor,
        color,
      } as PresetColor);
      alert(res.message, res.isError);
      if (!res.isError) toggle();
    });
  };

  return (
    <div className={s.colorContainer}>
      <p className={s.label}>{presetColor.name}</p>
      <div className={s.colorPickerContainer}>
        <button
          className={`${s.swatch} ${s.presetColor}`}
          style={{
            backgroundColor: color,
          }}
          onClick={(e) => {
            e.preventDefault();
            toggle();
          }}
        />

        <Modal isOpen={isOpen} toggle={toggle}>
          <div className={s.colorPicker}>
            <h3>Modification : {presetColor.name}</h3>
            <p>
              (s&apos;appliquera à toutes les couleurs perso &quot;
              {presetColor.name}&quot; du thème)
            </p>
            <div className={s.picker}>
              <HexColorPicker color={color} onChange={setColor} />
            </div>
            <p>Couleur sélectionnée (notation hexadécimale) :</p>
            <div>
              <div
                className={s.halfWidth}
                style={{
                  backgroundColor: color,
                }}
              ></div>
              <HexColorInput
                color={color}
                onChange={setColor}
                prefixed={true}
                className={s.halfWidth}
              />
            </div>
            <button
              className={`adminButton ${s.halfWidth}`}
              onClick={onUpdatePresetColor}
            >
              OK
            </button>
            <button onClick={toggle} className={`adminButton ${s.halfWidth}`}>
              Annuler
            </button>
          </div>
        </Modal>
      </div>
      <button
        className="iconButton"
        aria-label="Supprimer"
        onClick={onDeletePresetColor}
        disabled={presetColor.name === BASE_PRESET_COLOR.name}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}
