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
import { getContentsFull } from "@/app/actions/contents";

export default async function Presentation() {
  const contents = await getContentsFull();

  return (
    <>
      <h1 className={s.pageTitle}>Contenus de la page Présentation</h1>
      <div className={s.formContainer}>
        <ImagesForm
          isMultiple={false}
          label={Label.PRESENTATION}
          smallImage={true}
          images={getPresentationImage(contents)}
          title="Image de présentation (facultatif)"
        />
      </div>
      <TextAreaForm
        textContent={getPresentationText(contents)}
        label={Label.PRESENTATION}
        textLabel="Présentation (facultatif)"
      />
      <TextAreaForm
        textContent={getDemarcheText(contents)}
        label={Label.DEMARCHE}
        textLabel="Démarche artistique (facultatif)"
      />
      <TextAreaForm
        textContent={getInspirationText(contents)}
        label={Label.INSPIRATION}
        textLabel="Inspiration (facultatif)"
      />
    </>
  );
}
