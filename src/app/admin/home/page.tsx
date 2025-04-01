import { getIntroText } from "@/utils/commonUtils";
import { Label } from "@prisma/client";
import s from "@/components/admin/admin.module.css";
import React from "react";
import TextAreaForm from "@/components/admin/form/content/textAreaForm";
import { getContentsFull } from "@/app/actions/contents";
import {
  getSliderLandscapeImages,
  getSliderPortraitImages,
} from "@/utils/imageUtils";
import HomeLayoutForm from "@/components/admin/home/homeLayoutForm";
import HomeSliderForm from "@/components/admin/home/homeSliderForm";

export default async function Home() {
  const contents = await getContentsFull();

  return (
    <>
      <h1 className={s.title1}>{`Contenus de la page Home`}</h1>
      <HomeLayoutForm />
      <div className={s.container}>
        <h3 className={s.title2}>{`Texte d'accueil (facultatif)`}</h3>
        <TextAreaForm
          textContent={getIntroText(contents)}
          label={Label.INTRO}
        />
      </div>
      <HomeSliderForm
        images={getSliderPortraitImages(contents)}
        title={`Images affichées sur écran mobile`}
        isMain={true}
        info={`Une ou plusieurs images possible. Format portrait mieux adapté`}
      />
      <HomeSliderForm
        images={getSliderLandscapeImages(contents)}
        title={`Images affichées sur écran ordinateur`}
        isMain={false}
        info={`Une ou plusieurs images possible. Format paysage ou carré mieux adapté`}
      />
    </>
  );
}
