"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/app/context/themeProvider";
import { Theme } from "@prisma/client";
import { SessionProvider } from "@/app/context/sessionProvider";
import { Session } from "@/lib/db/item";
import { AlertProvider } from "@/app/context/AlertProvider";

interface Props {
  session: Session | null;
  theme: Theme;
  children: ReactNode;
}

export default function Providers({ children, theme, session }: Props) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <AlertProvider>{children}</AlertProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
