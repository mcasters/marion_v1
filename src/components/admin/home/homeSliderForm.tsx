"use client";

import React from "react";
import s from "@/components/admin/admin.module.css";
import ImagesForm from "@/components/admin/form/image/imagesForm";
import { Label } from "@prisma/client";
import { Image } from "@/lib/type";

type Props = {
  images: Image[];
  title: string;
  isMain: boolean;
  info?: string;
};

export default function HomeSliderForm({ images, title, info, isMain }: Props) {
  return (
    <div className={s.container}>
      <h2 className={s.title2}>{title}</h2>
      <ImagesForm
        images={images}
        isMultiple={true}
        label={Label.SLIDER}
        acceptSmallImage={false}
        isMain={isMain}
        title={info}
      />
    </div>
  );
}
