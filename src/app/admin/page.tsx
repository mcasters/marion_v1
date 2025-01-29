import AdminTheme from "@/components/admin/theme/AdminTheme";
import { AdminWorkThemeProvider } from "@/app/context/adminWorkThemeProvider";
import { redirect } from "next/navigation";
import { getSession } from "@/app/lib/auth";
import {
  getActiveTheme,
  getPresetColors,
  getThemesFull,
} from "@/app/actions/theme";

export default async function Page() {
  const session = await getSession();
  const themes = await getThemesFull();
  const presetColors = await getPresetColors();
  const isAdmin = session?.user?.isAdmin;
  let activeTheme = themes.filter((t) => t.isActive)[0];
  if (!activeTheme) activeTheme = await getActiveTheme();

  if (isAdmin) {
    return (
      <AdminWorkThemeProvider defaultWorkTheme={activeTheme}>
        <AdminTheme themes={themes} presetColors={presetColors} />
      </AdminWorkThemeProvider>
    );
  } else {
    redirect("/home");
  }
}
