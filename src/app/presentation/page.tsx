import React from "react";
import {
  getDemarche,
  getInspiration,
  getPresentation,
  getPresentationImage,
} from "@/utils/commonUtils";
import PresentationComponent from "@/components/presentation/presentationComponent";
import { getContentsFull } from "@/app/actions/contents";

export default async function Presentation() {
  const contents = await getContentsFull();

  return (
    <PresentationComponent
      images={getPresentationImage(contents)}
      presentation={getPresentation(contents)}
      demarche={getDemarche(contents)}
      inspiration={getInspiration(contents)}
    />
  );
}
