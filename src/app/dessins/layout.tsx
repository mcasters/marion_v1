import { ReactNode } from "react";
import s from "@/styles/itemPage.module.css";
import { Metadata } from "next";
import { getMetaMap } from "@/utils/commonUtils";
import { getMetas } from "@/app/actions/meta";

import { META } from "@/constants/admin";

export async function generateMetadata(): Promise<Metadata | undefined> {
  const metas = getMetaMap(await getMetas());
  if (metas) {
    return {
      title: metas.get(META.DOCUMENT_TITLE_DRAWING_HOME),
      description: metas.get(META.DESCRIPTION_DRAWING_HOME),
      openGraph: {
        title: metas.get(META.DOCUMENT_TITLE_DRAWING_HOME),
        description: metas.get(META.DESCRIPTION_DRAWING_HOME),
        url: metas.get(META.URL),
        siteName: metas.get(META.SEO_SITE_TITLE),
        locale: "fr",
        type: "website",
      },
    };
  }
}

export default async function layout({ children }: { children: ReactNode }) {
  return (
    <div className={s.container}>
      <h1 className="hidden">Les dessins</h1>
      {children}
    </div>
  );
}
