import { AdminWorkThemeProvider } from "@/app/context/adminWorkThemeProvider";
import {
  getActiveTheme,
  getPresetColors,
  getThemesFull,
} from "@/app/actions/theme";
import AdminHome from "@/components/admin/AdminHome";
import { getMessages } from "@/app/actions/messages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "",
  description: "",
  keywords: "",
  openGraph: null,
};

export default async function Page() {
  const themes = await getThemesFull();
  const presetColors = await getPresetColors();
  const activeTheme = await getActiveTheme(themes);
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
