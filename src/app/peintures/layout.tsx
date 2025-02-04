import React, { ReactNode } from "react";
import s from "@/styles/ItemPage.module.css";
import { Metadata } from "next";
import { DESCRIPTION, DOCUMENT_TITLE } from "@/constants/specific/metaHtml";

export const metadata: Metadata = {
  title: DOCUMENT_TITLE.PAINTING,
  description: DESCRIPTION.PAINTING,
};

export default async function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className={s.container}>
        <h1 className="hidden">Les peintures</h1>
        {children}
      </div>
    </>
  );
}
