"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";
import { Session } from "next-auth";
import { ThemeProvider } from "@/app/context/themeProvider";
import { Theme } from "@prisma/client";

interface Props {
  session: Session | null;
  theme: Theme;
  children: ReactNode;
}

export default function Providers({ children, session, theme }: Props) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <Toaster />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
