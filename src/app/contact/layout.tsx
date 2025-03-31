import React, { ReactNode } from "react";
import s from "@/styles/contactPage.module.css";
import { Metadata } from "next";
import { getMetaMap } from "@/utils/commonUtils";
import { getMetas } from "@/app/actions/meta";

import { META } from "@/constants/admin";
import { getSession } from "@/app/lib/auth";

export async function generateMetadata(): Promise<Metadata | undefined> {
  const session = await getSession();
  const metas = getMetaMap(await getMetas(!!session));
  if (metas) {
    return {
      title: metas.get(META.DOCUMENT_TITLE_CONTACT),
      description: metas.get(META.DESCRIPTION_CONTACT),
      openGraph: {
        title: metas.get(META.DOCUMENT_TITLE_CONTACT),
        description: metas.get(META.DESCRIPTION_CONTACT),
        url: metas.get(META.URL),
        siteName: metas.get(META.SEO_SITE_TITLE),
        locale: "fr",
        type: "website",
      },
    };
  }
}

export default async function layout({ children }: { children: ReactNode }) {
  const session = await getSession();
  const metas = getMetaMap(await getMetas(!!session));
  const owner = metas.get(META.SITE_TITLE);
  return (
    <div className={s.container}>
      <h1 className="hidden">Contacter {owner}</h1>
      {children}
    </div>
  );
}
