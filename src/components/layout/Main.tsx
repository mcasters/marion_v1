"use client";

import { ReactNode } from "react";
import LAYOUT from "@/constants/layout";

export type Props = {
  isHome: boolean;
  children: ReactNode;
};

export default function Main({ isHome, children }: Props) {
  return (
    <main
      style={{
        marginTop: !isHome
          ? LAYOUT.LINE_HEIGHT + LAYOUT.NAV_1_HEIGHT + LAYOUT.NAV_2_HEIGHT
          : "",
      }}
    >
      {children}
    </main>
  );
}
