"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/app/context/themeProvider";
import { Theme } from "@prisma/client";
import { SessionProvider } from "@/app/context/sessionProvider";
import { Session } from "@/lib/type";
import { AlertProvider } from "@/app/context/AlertProvider";
import { MetaProvider } from "@/app/context/metaProvider";

interface Props {
  session: Session | null;
  theme: Theme;
  metas: { [index: string]: string };
  children: ReactNode;
}

export default function Providers({ children, theme, session, metas }: Props) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <MetaProvider metas={metas}>
          <AlertProvider>{children}</AlertProvider>
        </MetaProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
