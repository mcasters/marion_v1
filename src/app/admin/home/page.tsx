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
      <div className={s.formContainer}>
        <h2>Image(s) au format portrait (visible sur mobile)</h2>
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
          title=""
          isMain
        />
      </div>
      <div className={s.formContainer}>
        <h2>
          Image(s) au format paysage ou carré (visible sur ordinateur de bureau)
        </h2>
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
          title=""
        />
      </div>
    </div>
  );
}
