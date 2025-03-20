"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/app/context/themeProvider";
import { Theme } from "@prisma/client";
import { SessionProvider } from "@/app/context/sessionProvider";
import { Session } from "@/lib/type";
import { AlertProvider } from "@/app/context/alertProvider";
import { MetaProvider } from "@/app/context/metaProvider";

interface Props {
  session: Session | null;
  theme: Theme;
  metaMap: Map<string, string>;
  children: ReactNode;
}

export default function Providers({
  children,
  theme,
  session,
  metaMap,
}: Props) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <MetaProvider metaMap={metaMap}>
          <AlertProvider>{children}</AlertProvider>
        </MetaProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
