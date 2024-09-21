"use client";

import { ReactNode } from "react";

import s from "@/styles/Main.module.css";
import LAYOUT from "@/constants/layout";

export type Props = {
  isHome: boolean;
  children: ReactNode;
};

export default function Main({ isHome, children }: Props) {
  return isHome ? (
    <div className={s.mainHomeContainer}>
      <main className={s.mainHome}>{children}</main>
    </div>
  ) : (
    <main
      className={s.main}
      style={{
        marginTop:
          LAYOUT.LINE_HEIGHT + LAYOUT.NAV_1_HEIGHT + LAYOUT.NAV_2_HEIGHT,
      }}
    >
      {children}
    </main>
  );
}
