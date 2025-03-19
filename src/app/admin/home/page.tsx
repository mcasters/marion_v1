import { getIntroText } from "@/utils/commonUtils";
import { Label } from "@prisma/client";
import s from "@/styles/admin/admin.module.css";
import React from "react";
import ImagesForm from "@/components/admin/form/image/ImagesForm";
import TextAreaForm from "@/components/admin/form/content/TextAreaForm";
import { getContentsFull } from "@/app/actions/contents";
import {
  getSliderLandscapeImages,
  getSliderPortraitImages,
} from "@/utils/imageUtils";

export default async function Home() {
  const contents = await getContentsFull();

  return (
    <div className={s.container}>
      <h1 className={s.title1}>{`Contenus de la page Home`}</h1>
      <div className={s.container}>
        <h3 className={s.title3}>{`Texte d'accueil (facultatif)`}</h3>
        <TextAreaForm
          textContent={getIntroText(contents)}
          label={Label.INTRO}
        />
      </div>
      <div className={s.container}>
        <h3 className={s.title3}>
          {`Images affichées sur écran mobile (Format portrait mieux adapté)`}
        </h3>
        <ImagesForm
          images={getSliderPortraitImages(contents)}
          isMultiple={true}
          label={Label.SLIDER}
          isMain
          smallImage={false}
        />
      </div>
      <div className={s.container}>
        <h3 className={s.title3}>
          {`Images affichées sur écran ordinateur (Format paysage ou carré mieux adapté)`}
        </h3>
        <ImagesForm
          images={getSliderLandscapeImages(contents)}
          isMultiple={true}
          label={Label.SLIDER}
          smallImage={false}
        />
      </div>
    </div>
  );
}
