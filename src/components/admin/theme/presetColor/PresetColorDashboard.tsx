"use client";

import { PresetColor, Theme } from "@prisma/client";
import PresetColorPicker from "@/components/admin/theme/presetColor/PresetColorPicker";

type Props = {
  presetColors: PresetColor[];
  themes: Theme[];
};

export default function PresetColorDashboard({ presetColors, themes }: Props) {
  return presetColors.map((presetColor: PresetColor) => (
    <PresetColorPicker
      key={presetColor.id}
      presetColor={presetColor}
      themes={themes}
    />
  ));
}
