"use client";

import React from "react";
import s from "@/components/admin/admin.module.css";
import ImagesForm from "@/components/admin/form/image/imagesForm";
import { Label } from "@prisma/client";
import { Image } from "@/lib/type";

type Props = {
  mobileImages: Image[];
  desktopImages: Image[];
};

export default function HomeSliderForm({ mobileImages, desktopImages }: Props) {
  return (
    <>
      <div className={s.container}>
        <h2 className={s.title2}>{`Images affichées sur écran mobile`}</h2>
        <ImagesForm
          images={mobileImages}
          isMultiple={true}
          label={Label.SLIDER}
          acceptSmallImage={false}
          title={`Une ou plusieurs images possible. Format portrait mieux adapté`}
          isMain={true}
        />
      </div>
      <div className={s.container}>
        <h2 className={s.title2}>{`Images affichées sur écran ordinateur`}</h2>
        <ImagesForm
          images={desktopImages}
          isMultiple={true}
          label={Label.SLIDER}
          acceptSmallImage={false}
          title={`Une ou plusieurs images possible. Format paysage ou carré mieux adapté`}
          isMain={false}
        />
      </div>
    </>
  );
}
