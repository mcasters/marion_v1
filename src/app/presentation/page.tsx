import React from "react";
import {
  getDemarche,
  getInspiration,
  getMetaMap,
  getPresentation,
  getPresentationImage,
} from "@/utils/commonUtils";
import PresentationComponent from "@/components/presentation/presentationComponent";
import { getContentsFull } from "@/app/actions/contents";
import { Metadata } from "next";
import { getMetas } from "@/app/actions/meta";
import { META } from "@/constants/admin.ts";

export async function generateMetadata(): Promise<Metadata | undefined> {
  const metas = getMetaMap(await getMetas());
  if (metas) {
    return {
      title: metas.get(META.DOCUMENT_TITLE_PRESENTATION),
      description: metas.get(META.DESCRIPTION_PRESENTATION),
      openGraph: {
        title: metas.get(META.DOCUMENT_TITLE_PRESENTATION),
        description: metas.get(META.DESCRIPTION_PRESENTATION),
        url: metas.get(META.URL),
        siteName: metas.get(META.SEO_SITE_TITLE),
        locale: "fr",
        type: "website",
      },
    };
  }
}

export default async function Presentation() {
  const contents = await getContentsFull();

  return (
    <>
      <h1 className="hidden">Présentation</h1>
      <PresentationComponent
        images={getPresentationImage(contents)}
        presentation={getPresentation(contents)}
        demarche={getDemarche(contents)}
        inspiration={getInspiration(contents)}
      />
    </>
  );
}
