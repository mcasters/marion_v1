"use client";

import s from "@/styles/admin/AdminTheme.module.css";
import React, { useState } from "react";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { HexColorInput, HexColorPicker } from "react-colorful";
import Modal from "@/components/admin/form/modal/Modal";
import useModal from "@/components/admin/form/modal/useModal";
import { PresetColor, Theme } from "@prisma/client";
import { useAdminThemesContext } from "@/app/context/adminThemesProvider";
import { useAdminPresetColorsContext } from "@/app/context/adminPresetColorsProvider";
import CancelButton from "@/components/admin/form/CancelButton";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { useAlert } from "@/app/context/AlertProvider";

interface Props {
  presetColor: PresetColor;
}

export default function PresetColorPicker({ presetColor }: Props) {
  const { isOpen, toggle } = useModal();
  const { setThemes } = useAdminThemesContext();
  const { workTheme, setWorkTheme } = useAdminWorkThemeContext();
  const { setPresetColors } = useAdminPresetColorsContext();
  const alert = useAlert();
  const [currentPresetColor, setCurrentPresetColor] =
    useState<PresetColor>(presetColor);

  const updatePresetColor = () => {
    fetch("admin/api/theme/preset-color/update", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ ...currentPresetColor }),
    })
      .then((res) => res.json())
      .then((json) => {
        const updatedPresetColors: PresetColor[] = json.updatedPresetColors;
        if (updatedPresetColors) {
          setPresetColors(updatedPresetColors);
          toggle();
          alert("Couleur perso mise à jour");
        } else alert("Erreur à l'enregistrement", true);
      });
  };

  const remove = () => {
    if (confirm("Sûr de vouloir supprimer ?")) {
      fetch(`admin/api/theme/preset-color/delete/${presetColor.id}`)
        .then((res) => res.json())
        .then((json) => {
          const updatedThemes: Theme[] = json.updatedThemes;
          const updatedPresetColors: PresetColor[] = json.updatedPresetColors;
          if (updatedThemes && updatedPresetColors) {
            setThemes(updatedThemes);
            setPresetColors(updatedPresetColors);
            const workThemeUpdated = updatedThemes.find(
              (t: Theme) => t.id === workTheme.id,
            );
            if (workThemeUpdated) setWorkTheme({ ...workThemeUpdated });
            alert("Couleur perso supprimée");
          } else alert("Erreur à la suppression", true);
        });
    }
  };

  return (
    <div className={s.colorContainer}>
      <p className={s.label}>{presetColor.name}</p>
      <div className={s.colorPickerContainer}>
        <button
          className={`${s.swatch} ${s.presetColor}`}
          style={{
            backgroundColor: currentPresetColor.color,
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
              (s&apos;appliquera à toutes les couleurs "{presetColor.name}" du
              thème)
            </p>
            <div className={s.picker}>
              <HexColorPicker
                color={currentPresetColor.color}
                onChange={(c) =>
                  setCurrentPresetColor({ ...presetColor, color: c })
                }
              />
            </div>
            <p>Couleur sélectionnée (notation hexadécimale) :</p>
            <div>
              <div
                className={s.halfWidth}
                style={{
                  backgroundColor: currentPresetColor.color,
                }}
              ></div>
              <HexColorInput
                color={currentPresetColor.color}
                onChange={(c) =>
                  setCurrentPresetColor({ ...presetColor, color: c })
                }
                prefixed={true}
                className={s.halfWidth}
              />
            </div>
            <button className="adminButton" onClick={updatePresetColor}>
              OK
            </button>
            <CancelButton onCancel={toggle} />
          </div>
        </Modal>
      </div>
      <button
        className="iconButton"
        aria-label="Supprimer"
        onClick={(e) => {
          e.preventDefault();
          remove();
        }}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}
