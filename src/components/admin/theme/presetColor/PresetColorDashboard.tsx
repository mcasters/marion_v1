"use client";

import { PresetColor } from "@prisma/client";
import PresetColorPicker from "@/components/admin/theme/presetColor/PresetColorPicker";

type Props = {
  presetColors: PresetColor[];
};

export default function PresetColorDashboard({ presetColors }: Props) {
  return presetColors.map((presetColor: PresetColor) => (
    <PresetColorPicker key={presetColor.id} presetColor={presetColor} />
  ));
}
