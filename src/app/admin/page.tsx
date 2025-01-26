import AdminTheme from "@/components/admin/theme/AdminTheme";
import { AdminWorkThemeProvider } from "@/app/context/adminWorkThemeProvider";
import { getActivatedBaseTheme } from "@/lib/db/theme";
import { AdminPresetColorsProvider } from "@/app/context/adminPresetColorsProvider";
import { AdminThemesProvider } from "@/app/context/adminThemesProvider";
import { redirect } from "next/navigation";
import { getSession } from "@/app/lib/auth/lib";
import { getPresetColors, getThemesFull } from "@/app/actions/theme";

export default async function Page() {
  const session = await getSession();
  const isAdmin = session?.user?.isAdmin;
  const themes = await getThemesFull();
  let activeTheme = themes.filter((t) => t.isActive)[0];
  if (!activeTheme) activeTheme = await getActivatedBaseTheme();
  const presetColors = await getPresetColors();

  if (isAdmin) {
    return (
      <AdminThemesProvider defaultThemes={themes}>
        <AdminWorkThemeProvider defaultWorkTheme={activeTheme}>
          <AdminPresetColorsProvider defaultPresetColors={presetColors}>
            <AdminTheme themes={themes} />
          </AdminPresetColorsProvider>
        </AdminWorkThemeProvider>
      </AdminThemesProvider>
    );
  } else {
    redirect("/home");
  }
}
