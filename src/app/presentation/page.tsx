import React from "react";
import {
  getDemarcheText,
  getInspirationText,
  getPresentationContent,
} from "@/utils/commonUtils";
import PresentationComponent from "@/components/presentation/presentationComponent";
import { getContentsFull } from "@/app/actions/contents";
import { getSession } from "@/app/lib/auth";

export default async function Presentation() {
  const session = await getSession();
  const contents = await getContentsFull(!!session);
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
