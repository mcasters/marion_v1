import s from "@/styles/contact.module.css";
import { Metadata } from "next";
import { DESCRIPTION, DOCUMENT_TITLE } from "@/constants/metaHtml";
import React from "react";

export const metadata: Metadata = {
  title: DOCUMENT_TITLE.CONTACT,
  description: DESCRIPTION.CONTACT,
};

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={s.container}>{children}</div>;
}
