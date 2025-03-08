"use client";

import s from "./PresentationComponent.module.css";
import React, { useMemo } from "react";
import Image from "next/image";
import { DEVICE } from "@/constants/image";
import { ContentFull } from "@/lib/type";
import useWindowSize from "@/components/hooks/useWindowSize";
import { getContentPhotoTab } from "@/utils/imageUtils";
import { useMetas } from "@/app/context/metaProvider";
import { META } from "@/constants/specific";

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
          <Image
            src={photo.src}
            width={photo.width}
            height={photo.height}
            alt={photo.alt}
            className={s.photo}
            style={{
              objectFit: "contain",
            }}
            priority
            unoptimized
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
