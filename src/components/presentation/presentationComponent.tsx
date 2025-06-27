"use client";

import s from "./presentationComponent.module.css";
import React, { useMemo } from "react";
import { DEVICE } from "@/constants/image";
import { ContentFull } from "@/lib/type";
import useWindowSize from "@/components/hooks/useWindowSize";
import { getContentPhotoTab } from "@/utils/imageUtils";
import { useMetas } from "@/app/context/metaProvider";

import { META } from "@/constants/admin";
import FormattedImage from "@/components/image/formattedImage.tsx";

interface Props {
  presentationContent: ContentFull | null;
  demarcheText: string;
  inspirationText: string;
}
export default function PresentationComponent({
  presentationContent,
  demarcheText,
  inspirationText,
}: Props) {
  const window = useWindowSize();
  const isSmall = window.innerWidth < DEVICE.SMALL;
  const metas = useMetas();
  const alt = `Photo de ${metas.get(META.SITE_TITLE)}`;
  const photo = useMemo(() => {
    return isSmall
      ? getContentPhotoTab(presentationContent, alt).sm[0]
      : getContentPhotoTab(presentationContent, alt).md[0];
  }, [presentationContent, isSmall]);

  return (
    <>
      <section className={s.contentWrapper}>
        {photo && (
          <FormattedImage
            photo={photo}
            priority
            maxWidth={isSmall ? 80 : 35}
            maxHeight={isSmall ? 40 : 40}
          />
        )}

        <p className={s.presentationText}>{presentationContent?.text}</p>
      </section>

      {demarcheText !== "" && (
        <section className={s.contentWrapper}>
          <h2>Démarche artistique</h2>
          <p>{demarcheText}</p>
        </section>
      )}
      {inspirationText !== "" && (
        <section className={s.contentWrapper}>
          <h2>Inspirations</h2>
          <p>{inspirationText}</p>
        </section>
      )}
    </>
  );
}
