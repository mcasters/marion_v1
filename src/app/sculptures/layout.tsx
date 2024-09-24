import { ReactNode } from "react";
import s from "@/styles/ItemPage.module.css";
import { Metadata } from "next";
import { DESCRIPTION, DOCUMENT_TITLE } from "@/constants/metaHtml";

export const metadata: Metadata = {
  title: DOCUMENT_TITLE.SCULPTURE,
  description: DESCRIPTION.SCULPTURE,
};

export default async function layout({ children }: { children: ReactNode }) {
  return (
    <div className={s.container}>
      <h1 className="hidden">Les sculptures</h1>
      <div className={s.sculptureContent}>{children}</div>
    </div>
  );
}
