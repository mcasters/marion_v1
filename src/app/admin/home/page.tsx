import { getContentsFull } from "@/app/api/content/getContents";
import { getIntroText, getSliders } from "@/utils/commonUtils";
import { Label } from "@prisma/client";
import Preview from "@/components/admin/form/imageForm/Preview";
import s from "@/styles/admin/Admin.module.css";
import React from "react";
import ImagesForm from "@/components/admin/form/imageForm/ImagesForm";
import TextAreaForm from "@/components/admin/form/TextAreaForm";

export default async function Home() {
  const contents = await getContentsFull();
  const sliderImages = getSliders(contents);
  return (
    <div className={s.formContainer}>
      <h1 className={s.pageTitle}>Contenus de la page Home</h1>
      <TextAreaForm
        textContent={getIntroText(contents)}
        label={Label.INTRO}
        api="api/content/update"
        textLabel="Introduction (facultatif)"
      />
      {sliderImages.length > 0 && (
        <Preview
          images={sliderImages}
          pathImage="/images/miscellaneous"
          apiForDelete="api/content/delete-image"
          textLabel="Slider (une ou plusieurs images)"
        />
      )}
      <ImagesForm
        api="api/content/update"
        isMultiple={true}
        label={Label.SLIDER}
        title=""
      />
    </div>
  );
}
