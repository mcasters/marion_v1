import React from "react";
import {
  getDemarcheText,
  getInspirationText,
  getPresentationContent,
} from "@/utils/commonUtils";
import PresentationComponent from "@/components/presentation/PresentationComponent";
import { getContentsFull } from "@/app/actions/contents";
import s from "@/styles/presentation.module.css";
import { Metadata } from "next";
import { DESCRIPTION, DOCUMENT_TITLE } from "@/constants/specific/metaHtml";

export const metadata: Metadata = {
  title: DOCUMENT_TITLE.PRESENTATION,
  description: DESCRIPTION.PRESENTATION,
};

export default async function Presentation() {
  const contents = await getContentsFull();
  const presentationContent = getPresentationContent(contents);
  const demarche = getDemarcheText(contents);
  const inspiration = getInspirationText(contents);

  return (
    <div className={s.container}>
      <h1 className="hidden">Présentation</h1>
      <PresentationComponent
        presentationContent={presentationContent}
        demarcheText={demarche}
        inspirationText={inspiration}
      />
    </div>
  );
}
