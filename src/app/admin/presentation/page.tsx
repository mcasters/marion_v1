import { getContentsFull } from "@/app/api/content/getContents";
import {
  getDemarcheText,
  getInspirationText,
  getPresentationImage,
  getPresentationText,
} from "@/utils/commonUtils";
import s from "@/styles/admin/Admin.module.css";
import { Label } from "@prisma/client";
import React from "react";
import TextAreaForm from "@/components/admin/form/TextAreaForm";
import ImagesForm from "@/components/admin/form/imageForm/ImagesForm";
import Preview from "@/components/admin/form/imageForm/Preview";

export default async function Presentation() {
  const contents = await getContentsFull();
  const presentationImages = getPresentationImage(contents);

  return (
    <>
      <h1 className={s.pageTitle}>Contenus de la page Présentation</h1>
      <div className={s.formContainer}>
        {presentationImages.length > 0 && (
          <Preview
            images={presentationImages}
            pathImage="/images/miscellaneous"
            apiForDelete="api/content/delete-image"
          />
        )}
        <ImagesForm
          isMultiple={false}
          api="api/content/update"
          label={Label.PRESENTATION}
        />
      </div>
      <TextAreaForm
        textContent={getPresentationText(contents)}
        label={Label.PRESENTATION}
        api="api/content/update"
        textLabel="Présentation"
      />
      <TextAreaForm
        textContent={getDemarcheText(contents)}
        label={Label.DEMARCHE}
        api="api/content/update"
        textLabel="Démarche artistique"
      />
      <TextAreaForm
        textContent={getInspirationText(contents)}
        label={Label.INSPIRATION}
        api="api/content/update"
        textLabel="Inspiration"
      />
    </>
  );
}
