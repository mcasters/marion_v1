import React, { ReactNode } from "react";
import s from "@/styles/PostPage.module.css";
import { Metadata } from "next";
import { DESCRIPTION, DOCUMENT_TITLE } from "@/constants/metaHtml";

export const metadata: Metadata = {
  title: DOCUMENT_TITLE.POST,
  description: DESCRIPTION.POST,
};

export default async function layout({ children }: { children: ReactNode }) {
  return (
    <div className={s.container}>
      <h1 className="hidden">Posts</h1>
      {children}
    </div>
  );
}
