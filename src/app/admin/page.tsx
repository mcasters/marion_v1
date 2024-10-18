import AdminTheme from "@/components/admin/theme/AdminTheme";
import { getPresetColors, getThemesFull } from "@/app/api/theme/getTheme";
import { AdminWorkThemeProvider } from "@/app/context/adminWorkThemeProvider";
import { getActivatedBaseTheme } from "@/lib/db/theme";
import { AdminPresetColorsProvider } from "@/app/context/adminPresetColorsProvider";
import { AdminThemesProvider } from "@/app/context/adminThemesProvider";
import AccessDenied from "@/components/auth/AccessDenied";
import { redirect } from "next/navigation";
import { getSession } from "@/app/lib/auth/lib";

export default async function Page() {
  const session = await getSession();
  const isAdmin = session?.user?.isAdmin;
  const themes = await getThemesFull();
  let activeTheme = themes.filter((t) => t.isActive)[0];
  if (!activeTheme) activeTheme = await getActivatedBaseTheme();
  const presetColors = await getPresetColors();

  const accessDenied = !isAdmin;
  if (accessDenied) {
    redirect("/login");
  }

  if (isAdmin) {
    return (
      <AdminThemesProvider defaultThemes={themes}>
        <AdminWorkThemeProvider defaultWorkTheme={activeTheme}>
          <AdminPresetColorsProvider defaultPresetColors={presetColors}>
            <AdminTheme />
          </AdminPresetColorsProvider>
        </AdminWorkThemeProvider>
      </AdminThemesProvider>
    );
  } else {
    return <AccessDenied />; // Component shown for unauthorized access
  }
}
