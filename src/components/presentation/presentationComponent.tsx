"use client";

import s from "./presentationComponent.module.css";
import React from "react";
import { DEVICE } from "@/constants/image";
import { Image } from "@/lib/type";
import useWindowSize from "@/components/hooks/useWindowSize";
import { getPhotoTabFromImages } from "@/utils/imageUtils";
import { useMetas } from "@/app/context/metaProvider";

import { META } from "@/constants/admin";
import FormattedImage from "@/components/image/formattedImage.tsx";

interface Props {
  images: Image[];
  presentation: string;
  demarche: string;
  inspiration: string;
}
export default function PresentationComponent({
  images,
  presentation,
  demarche,
  inspiration,
}: Props) {
  const window = useWindowSize();
  const isSmall = window.innerWidth < DEVICE.SMALL;
  const metas = useMetas();
  const alt = `Photo de ${metas.get(META.SITE_TITLE)}`;
  const photoTab = getPhotoTabFromImages(images, "miscellaneous", alt);

  return (
    <>
      <section className={s.contentWrapper}>
        {photoTab.sm.length > 0 && (
          <FormattedImage
            photo={isSmall ? photoTab.sm[0] : photoTab.md[0]}
            priority
            maxWidth={isSmall ? 80 : 35}
            maxHeight={isSmall ? 40 : 40}
          />
        )}

        <p className={s.presentationText}>{presentation}</p>
      </section>

      {demarche !== "" && (
        <section className={s.contentWrapper}>
          <h2>Démarche artistique</h2>
          <p>{demarche}</p>
        </section>
      )}
      {inspiration !== "" && (
        <section className={s.contentWrapper}>
          <h2>Inspirations</h2>
          <p>{inspiration}</p>
        </section>
      )}
    </>
  );
}
