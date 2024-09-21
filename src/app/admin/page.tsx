import AdminTheme from "@/components/admin/theme/AdminTheme";
import { getPresetColors, getThemesFull } from "@/app/api/theme/getTheme";
import { AdminWorkThemeProvider } from "@/app/context/adminWorkThemeProvider";
import { getActivatedBaseTheme } from "@/lib/db/theme";
import { AdminPresetColorsProvider } from "@/app/context/adminPresetColorsProvider";
import { AdminThemesProvider } from "@/app/context/adminThemesProvider";

export const dynamic = "force-dynamic";

export default async function AdminIndex() {
  const themes = await getThemesFull();
  let activeTheme = themes.filter((t) => t.isActive)[0];
  if (!activeTheme) activeTheme = await getActivatedBaseTheme();
  const presetColors = await getPresetColors();

  return (
    <AdminThemesProvider defaultThemes={themes}>
      <AdminWorkThemeProvider defaultWorkTheme={activeTheme}>
        <AdminPresetColorsProvider defaultPresetColors={presetColors}>
          <AdminTheme />
        </AdminPresetColorsProvider>
      </AdminWorkThemeProvider>
    </AdminThemesProvider>
  );
}
