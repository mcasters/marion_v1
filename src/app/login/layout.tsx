import React, { ReactNode } from "react";
import s from "@/styles/Auth.module.css";
import { Metadata } from "next";
import { DOCUMENT_TITLE } from "@/constants/specific/metaHtml";

export const metadata: Metadata = {
  title: DOCUMENT_TITLE.AUTHENTICATION,
};

export default async function layout({ children }: { children: ReactNode }) {
  return (
    <div className={s.container}>
      <h1>Espace administration :</h1>
      <h2>Authentification nécessaire</h2>
      {children}
    </div>
  );
}
