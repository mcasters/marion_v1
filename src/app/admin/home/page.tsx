import { getContentsFull } from "@/app/api/content/getContents";
import {
  getIntroText,
  getSlidersLandscapeAndPortait,
} from "@/utils/commonUtils";
import { Label } from "@prisma/client";
import Preview from "@/components/admin/form/imageForm/Preview";
import s from "@/styles/admin/Admin.module.css";
import React from "react";
import ImagesForm from "@/components/admin/form/imageForm/ImagesForm";
import TextAreaForm from "@/components/admin/form/TextAreaForm";

export default async function Home() {
  const contents = await getContentsFull();
  const { portraitImages, landscapeImages } =
    getSlidersLandscapeAndPortait(contents);
  return (
    <div className={s.formContainer}>
      <h1 className={s.pageTitle}>Contenus de la page Home</h1>
      <h2>Texte accueil (facultatif)</h2>
      <TextAreaForm
        textContent={getIntroText(contents)}
        label={Label.INTRO}
        api="api/content/update"
      />
      <div className="separate"></div>
      <div className={s.formContainer}>
        <h2 className={s.homepage}>Images affichées sur écran mobile</h2>
        <p>(le format portrait est plus adapté)</p>
        {portraitImages.length > 0 && (
          <Preview
            images={portraitImages}
            pathImage="/images/miscellaneous"
            apiForDelete="api/content/delete-image"
          />
        )}
        <ImagesForm
          api="api/content/update"
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
        {landscapeImages.length > 0 && (
          <Preview
            images={landscapeImages}
            pathImage="/images/miscellaneous"
            apiForDelete="api/content/delete-image"
          />
        )}
        <ImagesForm
          api="api/content/update"
          isMultiple={true}
          label={Label.SLIDER}
          smallImage={false}
        />
      </div>
    </div>
  );
}
