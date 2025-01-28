"use client";

import { PresetColor } from "@prisma/client";
import PresetColorPicker from "@/components/admin/theme/presetColor/PresetColorPicker";

type Props = {
  presetColors: PresetColor[];
  onDeletePresetColor: (arg0: PresetColor) => void;
};

export default function PresetColorDashboard({
  presetColors,
  onDeletePresetColor,
}: Props) {
  return presetColors.map((presetColor: PresetColor) => (
    <PresetColorPicker
      key={presetColor.id}
      presetColor={presetColor}
      onDelete={onDeletePresetColor}
    />
  ));
}
