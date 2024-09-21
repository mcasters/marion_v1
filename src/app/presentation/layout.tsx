import React, { ReactNode } from "react";
import s from "@/styles/presentation.module.css";
import { Metadata } from "next";
import { DESCRIPTION, DOCUMENT_TITLE } from "@/constants/metaHtml";

export const metadata: Metadata = {
  title: DOCUMENT_TITLE.PRESENTATION,
  description: DESCRIPTION.PRESENTATION,
};

export default async function layout({ children }: { children: ReactNode }) {
  return (
    <div className={s.container}>
      <h1 className={s.title}>Présentation</h1>
      {children}
    </div>
  );
}
