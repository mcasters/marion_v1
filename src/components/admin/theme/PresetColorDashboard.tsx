"use client";

import React from "react";
import { PresetColor } from "@prisma/client";
import PresetColorPicker from "@/components/admin/theme/PresetColorPicker";
import { useAdminPresetColorsContext } from "@/app/context/adminPresetColorsProvider";

export default function PresetColorDashboard() {
  const { presetColors } = useAdminPresetColorsContext();

  return presetColors.map((presetColor: PresetColor) => (
    <PresetColorPicker key={presetColor.id} presetColor={presetColor} />
  ));
}
