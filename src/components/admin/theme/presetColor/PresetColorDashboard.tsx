"use client";

import { PresetColor } from "@prisma/client";
import PresetColorPicker from "@/components/admin/theme/presetColor/PresetColorPicker";
import s from "@/styles/admin/AdminTheme.module.css";

type Props = {
  presetColors: PresetColor[];
  onDeletePresetColor: (arg0: PresetColor) => void;
};

export default function PresetColorDashboard({
  presetColors,
  onDeletePresetColor,
}: Props) {
  return (
    <div className={s.grid}>
      <section>
        {presetColors.map((presetColor: PresetColor) => (
          <PresetColorPicker
            key={presetColor.id}
            presetColor={presetColor}
            onDelete={onDeletePresetColor}
          />
        ))}
      </section>
    </div>
  );
}
