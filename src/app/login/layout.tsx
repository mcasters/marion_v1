import React, { ReactNode } from "react";
import s from "@/styles/Auth.module.css";
import { Metadata } from "next";
import { getMetaMap } from "@/utils/commonUtils";
import { getMetas } from "@/app/actions/meta";
import { META } from "@/constants/specific";

const metas = getMetaMap(await getMetas());

export const metadata: Metadata = {
  title: metas.get(META.DOCUMENT_TITLE_AUTHENTICATION),
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
