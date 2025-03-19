"use client";

import s from "@/components/admin/theme/adminTheme.module.css";
import React, { Dispatch, SetStateAction, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import Modal from "@/components/admin/form/modal/modal";
import useModal from "@/components/admin/form/modal/useModal";
import { PresetColor } from "@prisma/client";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { useAlert } from "@/app/context/AlertProvider";
import {
  deletePresetColor,
  updatePresetColor,
} from "@/app/actions/theme/admin";
import { BASE_PRESET_COLOR } from "@/constants/specific";

interface Props {
  presetColor: PresetColor;
  onDelete: Dispatch<SetStateAction<PresetColor | null>>;
}

export default function PresetColorPicker({ presetColor, onDelete }: Props) {
  const { isOpen, toggle } = useModal();
  const alert = useAlert();
  const [color, setColor] = useState<string>(presetColor.color);

  const onDeletePresetColor = async () => {
    const res = await deletePresetColor(presetColor.id);
    alert(res.message, res.isError);
    onDelete(presetColor);
  };

  const onUpdatePresetColor = async () => {
    const res = await updatePresetColor({
      ...presetColor,
      color,
    } as PresetColor);
    alert(res.message, res.isError);
    if (!res.isError) toggle();
  };

  return (
    <div className={s.colorContainer}>
      <p className={s.label}>{presetColor.name}</p>
      <div className={s.colorPickerContainer}>
        <button
          className={`${s.swatch} ${s.focus} ${s.presetColor}`}
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
              (s&apos;applique à toutes les utilisations de &quot;
              {presetColor.name}&quot;)
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
            <button className={s.halfWidth} onClick={onUpdatePresetColor}>
              OK
            </button>
            <button
              onClick={() => {
                setColor(presetColor.color);
                toggle();
              }}
              className={s.halfWidth}
            >
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
