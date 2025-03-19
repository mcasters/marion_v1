"use client";

import { ReactNode } from "react";
import s from "@/styles/layout.module.css";

export type Props = {
  isHome: boolean;
  children: ReactNode;
};

export default function Main({ isHome, children }: Props) {
  return <main className={`${isHome ? "" : s.main}`}>{children}</main>;
}
