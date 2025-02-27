import { AdminWorkThemeProvider } from "@/app/context/adminWorkThemeProvider";
import {
  getActiveTheme,
  getPresetColors,
  getThemesFull,
} from "@/app/actions/theme";
import AdminHome from "@/components/admin/AdminHome";
import { getMessages } from "@/app/actions/messages";

export default async function Page() {
  const themes = await getThemesFull();
  const presetColors = await getPresetColors();
  let activeTheme = themes.filter((t) => t.isActive)[0];
  if (!activeTheme) activeTheme = await getActiveTheme();
  const messages = await getMessages();

  return (
    <AdminWorkThemeProvider defaultWorkTheme={activeTheme}>
      <AdminHome
        themes={themes}
        presetColors={presetColors}
        messages={messages}
      />
    </AdminWorkThemeProvider>
  );
}
