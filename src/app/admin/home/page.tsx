import {
  getIntroText,
  getSlidersLandscapeImages,
  getSlidersPortraitImages,
} from "@/utils/commonUtils";
import { Label } from "@prisma/client";
import s from "@/styles/admin/Admin.module.css";
import React from "react";
import ImagesForm from "@/components/admin/form/imageForm/ImagesForm";
import TextAreaForm from "@/components/admin/form/TextAreaForm";
import { getContentsFull } from "@/app/actions/contents";
import PreviewForm from "@/components/admin/form/imageForm/PreviewForm";

export default async function Home() {
  const contents = await getContentsFull();

  return (
    <div className={s.formContainer}>
      <h1 className={s.pageTitle}>Contenus de la page Home</h1>
      <h2>Texte accueil (facultatif)</h2>
      <TextAreaForm textContent={getIntroText(contents)} label={Label.INTRO} />
      <div className="separate"></div>
      <div className={s.formContainer}>
        <h2 className={s.homepage}>Images affichées sur écran mobile</h2>
        <p>(le format portrait est plus adapté)</p>
        <PreviewForm
          images={getSlidersPortraitImages(contents)}
          contentLabel={Label.SLIDER}
        />
        <ImagesForm
          isMultiple={true}
          label={Label.SLIDER}
          isMain
          smallImage={false}
        />
      </div>
      <div className="separate"></div>
      <div className={s.formContainer}>
        <h2 className={s.homepage}>Images affichées sur écran ordinateur</h2>
        <p>(le format paysage ou carré est plus adapté)</p>
        <PreviewForm
          images={getSlidersLandscapeImages(contents)}
          contentLabel={Label.SLIDER}
        />
        <ImagesForm isMultiple={true} label={Label.SLIDER} smallImage={false} />
      </div>
    </div>
  );
}
