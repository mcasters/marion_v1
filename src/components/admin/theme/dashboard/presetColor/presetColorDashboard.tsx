"use client";

import { PresetColor } from "../../../../../../prisma/generated/client";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import PresetColorSwatch from "@/components/admin/theme/dashboard/presetColor/presetColorSwatch";

export default function PresetColorDashboard() {
  const { themes, presetColors } = useAdminWorkThemeContext();

  const presetColorCountUse = (presetColor: PresetColor): number => {
    let count = 0;
    themes.forEach((theme) => {
      Object.entries(theme).forEach(([key, value]) => {
        if (key.includes("_") && value === presetColor.name) {
          count += 1;
        }
      });
    });
    return count;
  };

  return (
    <section>
      {presetColors.map((p: PresetColor) => (
        <PresetColorSwatch
          key={p.id}
          presetColor={p}
          count={presetColorCountUse(p)}
        />
      ))}
    </section>
  );
}
