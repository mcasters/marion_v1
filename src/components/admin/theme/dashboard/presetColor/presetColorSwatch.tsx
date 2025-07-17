"use client";

import s from "@/components/admin/theme/adminTheme.module.css";
import React, { useState } from "react";
import Modal from "@/components/admin/form/modal.tsx";
import { PresetColor } from "../../../../../../prisma/generated/client";
import DeleteIcon from "@/components/icons/deleteIcon";
import { useAlert } from "@/app/context/alertProvider";
import {
  deletePresetColor,
  updatePresetColor,
} from "@/app/actions/theme/admin";
import { BASE_PRESET_COLOR } from "@/constants/specific";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import PresetColorPicker from "@/components/admin/theme/dashboard/presetColor/presetColorPicker";

interface Props {
  presetColor: PresetColor;
}

export default function PresetColorSwatch({ presetColor }: Props) {
  const alert = useAlert();
  const [isOpen, setIsOpen] = useState(false);
  const { setThemes, presetColors, setPresetColors, workTheme, setWorkTheme } =
    useAdminWorkThemeContext();

  const handleDelete = async () => {
    if (confirm("Sûr de vouloir supprimé ?")) {
      const { updatedPresetColors, updatedThemes, message, isError } =
        await deletePresetColor(presetColor.id);
      if (updatedThemes && updatedPresetColors) {
        setPresetColors(updatedPresetColors);
        setThemes(updatedThemes);
        const updatedWorkTheme = updatedThemes.find(
          (t) => t.id === workTheme.id,
        );
        if (updatedWorkTheme !== undefined) setWorkTheme(updatedWorkTheme);
      }
      alert(message, isError);
    }
  };

  const handleUpdate = async (color: string) => {
    const updatedPresetColor: PresetColor = {
      ...presetColor,
      color,
    } as PresetColor;
    const { message, isError } = await updatePresetColor(updatedPresetColor);
    if (!isError) {
      const updatedPresetColors = presetColors.map((p) => {
        if (p.id === updatedPresetColor.id) return updatedPresetColor;
        else return p;
      });
      setPresetColors(updatedPresetColors);
      if (!isError) setIsOpen(false);
    }
    alert(message, isError);
  };

  return (
    <div className={s.presetColorWrapper}>
      <p className={s.colorLabel}>{presetColor.name}</p>
      <div className={s.colorPickerContainer}>
        <button
          className={`${s.swatch} ${s.isPresetColor} ${s.presetColor}`}
          style={{
            backgroundColor: presetColor.color,
          }}
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        />
      </div>
      <button
        className="iconButton"
        aria-label="Supprimer"
        onClick={handleDelete}
        disabled={presetColor.name === BASE_PRESET_COLOR.name}
      >
        <DeleteIcon />
      </button>
      {isOpen && (
        <Modal
          handleCloseOutside={() => setIsOpen(false)}
          title={`Modification de "${presetColor.name}"`}
        >
          <PresetColorPicker
            presetColor={presetColor}
            onUpdate={handleUpdate}
            onCancel={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
