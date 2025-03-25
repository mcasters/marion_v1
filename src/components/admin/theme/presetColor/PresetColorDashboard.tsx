"use client";

import { PresetColor } from "@prisma/client";
import s from "@/components/admin/theme/adminTheme.module.css";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import PresetColorSwatch from "@/components/admin/theme/presetColor/presetColorSwatch";

export default function PresetColorDashboard() {
  const { presetColors } = useAdminWorkThemeContext();
  return (
    <div className={s.flex}>
      <section>
        {presetColors.map((presetColor: PresetColor) => (
          <PresetColorSwatch key={presetColor.id} presetColor={presetColor} />
        ))}
      </section>
    </div>
  );
}
