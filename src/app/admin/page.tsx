import AdminTheme from "@/components/admin/theme/AdminTheme";
import { AdminWorkThemeProvider } from "@/app/context/adminWorkThemeProvider";
import {
  getActiveTheme,
  getPresetColors,
  getThemesFull,
} from "@/app/actions/theme";

export default async function Page() {
  const themes = await getThemesFull();
  const presetColors = await getPresetColors();
  let activeTheme = themes.filter((t) => t.isActive)[0];
  if (!activeTheme) activeTheme = await getActiveTheme();

  return (
    <AdminWorkThemeProvider defaultWorkTheme={activeTheme}>
      <AdminTheme themes={themes} presetColors={presetColors} />
    </AdminWorkThemeProvider>
  );
}
