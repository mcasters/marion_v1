"use client";

import s from "./PresentationComponent.module.css";
import React from "react";
import Image from "next/image";
import { DEVICE } from "@/constants/image";
import { ContentFull } from "@/lib/db/item";
import { GENERAL } from "@/constants/specific/metaHtml";

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
  const isSmall = window.innerWidth < DEVICE.SMALL;
  const image = presentationContent?.images[0];

  return (
    <>
      <section className={s.contentWrapper}>
        {image && (
          <div
            className={s.imageWrap}
            style={{
              aspectRatio: image.width / image.height,
            }}
          >
            <Image
              src={`/images/miscellaneous/${isSmall ? "sm" : "md"}/${image.filename}`}
              fill
              alt={GENERAL.ALT_PHOTO_PRESENTATION}
              style={{
                objectFit: "contain",
              }}
              priority
              unoptimized
            />
          </div>
        )}
        <div className={s.contentWrapper}>
          <p>{presentationContent?.text}</p>
        </div>
      </section>

      {demarcheText && (
        <section className={s.contentWrapper}>
          <h2>Démarche artistique</h2>
          <p>{demarcheText}</p>
        </section>
      )}
      {inspirationText && (
        <section className={s.contentWrapper}>
          <h2>Inspirations</h2>
          <p>{inspirationText}</p>
        </section>
      )}
    </>
  );
}
