"use client";

import { Theme } from "../../../../../prisma/generated/client";
import React, { useEffect, useRef, useState } from "react";
import s from "@/components/admin/theme/adminTheme.module.css";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import {
  OnlyString,
  StructuredTheme,
  ThemeGeneralTarget,
  ThemePagePart,
  ThemeTarget,
} from "@/lib/type";
import ColorPicker from "@/components/admin/theme/dashboard/colorPicker";
import Modal from "@/components/admin/form/modal.tsx";
import { createPresetColor } from "@/app/actions/theme/admin";
import { useAlert } from "@/app/context/alertProvider";
import { colorNameToHex } from "@/utils/themeUtils";
import {
  THEME_ENHANCED_LABEL,
  THEME_GENERAL_TARGET_LABEL,
  THEME_PAGE_PART_LABEL,
  THEME_TARGET_LABEL,
} from "@/constants/admin";

interface Props {
  page: string;
  pagePart: string | null;
  target: string;
}

export default function ColorSwatch({ page, pagePart, target }: Props) {
  const {
    workTheme,
    setWorkTheme,
    isUpdated,
    setIsUpdated,
    presetColors,
    setPresetColors,
  } = useAdminWorkThemeContext();
  const alert = useAlert();
  const [isOpen, setIsOpen] = useState(false);
  const dbLabel = pagePart
    ? `${pagePart}_${target}_${page}`
    : `${target}_${page}`;
  const label = pagePart
    ? THEME_TARGET_LABEL[target as keyof ThemeTarget]
    : THEME_GENERAL_TARGET_LABEL[target as keyof ThemeGeneralTarget];
  const color: string = workTheme[dbLabel as keyof OnlyString<Theme>];
  const initialColor = useRef("");
  const initialIsUpdated = useRef(true);

  useEffect(() => {
    if (isOpen) {
      initialColor.current = color;
      initialIsUpdated.current = isUpdated;
    }
  }, [isOpen]);

  const handleColorChange = (color: string) => {
    setWorkTheme({
      ...workTheme,
      [dbLabel]: color,
    } as Theme);
    setIsUpdated(false);
  };

  const handleCreatePresetColor = async (
    nameColor: string,
    hexColor: string,
  ) => {
    const res = await createPresetColor(nameColor, hexColor);
    if (res.newPresetColor) {
      setPresetColors([...presetColors, res.newPresetColor]);
      setWorkTheme({ ...workTheme, [dbLabel]: nameColor } as Theme);
      setIsUpdated(false);
    }
    alert(res.message, res.isError);
  };

  const handleCancel = () => {
    setIsUpdated(initialIsUpdated.current);
    setWorkTheme({
      ...workTheme,
      [dbLabel]: initialColor.current,
    } as Theme);
    setIsOpen(false);
  };

  return (
    <div className={s.colorContainer}>
      <div className={s.colorPickerContainer}>
        <button
          className={
            isOpen
              ? `${s.swatch} ${s.open}`
              : !color.startsWith("#")
                ? `${s.swatch} ${s.isPresetColor}`
                : s.swatch
          }
          style={{
            backgroundColor: colorNameToHex(color, presetColors),
          }}
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
          title={color}
        />
        {isOpen && (
          <Modal
            handleCloseOutside={() => setIsOpen(false)}
            title={`${THEME_ENHANCED_LABEL[page as keyof StructuredTheme]} / ${pagePart ? `${THEME_PAGE_PART_LABEL[pagePart as keyof ThemePagePart]} /` : ""} ${label}`}
          >
            <ColorPicker
              color={color}
              onColorChange={handleColorChange}
              onCreatePresetColor={handleCreatePresetColor}
              onClose={() => setIsOpen(false)}
              onCancel={handleCancel}
            />
          </Modal>
        )}
      </div>
      <p className={s.label}>{label}</p>
    </div>
  );
}
