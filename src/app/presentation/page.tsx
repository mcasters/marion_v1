import React from "react";
import { getContentsFull } from "@/app/api/content/getContents";
import {
  getDemarcheText,
  getInspirationText,
  getPresentationContent,
} from "@/utils/commonUtils";
import PresentationComponent from "@/components/presentation/PresentationComponent";

export default async function Presentation() {
  const contents = await getContentsFull();
  const presentationContent = getPresentationContent(contents);
  const demarche = getDemarcheText(contents);
  const inspiration = getInspirationText(contents);

  return (
    <PresentationComponent
      presentationContent={presentationContent}
      demarcheText={demarche}
      inspirationText={inspiration}
    />
  );
}
