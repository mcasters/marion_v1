"use client";

import { PresetColor } from "../../../../../../prisma/generated/client";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import PresetColorSwatch from "@/components/admin/theme/dashboard/presetColor/presetColorSwatch";
import DragList from "@/components/admin/theme/dragList/dragList.tsx";
import s from "@/components/admin/theme/adminTheme.module.css";

export default function PresetColorDashboard() {
  const { themes, presetColors } = useAdminWorkThemeContext();

  /* const list: JSX.Element[] = presetColors.map((p: PresetColor) => (
    <PresetColorSwatch presetColor={p} count={presetColorCountUse(p)} />
  ));*/

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
    <section className={s.presetColorDashboard}>
      <DragList
        list={presetColors.map((p: PresetColor) => (
          <PresetColorSwatch presetColor={p} count={presetColorCountUse(p)} />
        ))}
      />
    </section>
  );
}
