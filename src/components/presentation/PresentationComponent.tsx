"use client";

import s from "./PresentationComponent.module.css";
import React from "react";
import Image from "next/image";
import { DEVICE } from "@/constants/image";
import { ContentFull } from "@/lib/db/item";

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
  return (
    <>
      <div className={s.contentWrapper}>
        {presentationContent?.images &&
          presentationContent?.images.length > 0 && (
            <div className={s.imageWrap}>
              <Image
                loader={({ src, width }) => {
                  const directory = width <= DEVICE.SMALL ? "sm" : "md";
                  return `/images/miscellaneous/${directory}/${src}`;
                }}
                src={`${presentationContent.images[0].filename}`}
                sizes="(max-width: 768px) 80vw, 50vw"
                fill
                alt="Photographie de présentation de Marion Casters"
                style={{
                  objectFit: "contain",
                }}
                priority
              />
            </div>
          )}
        <div className={s.contentWrapper}>
          <p>{presentationContent?.text}</p>
        </div>
      </div>

      {demarcheText && (
        <div className={s.contentWrapper}>
          <h2>Démarche artistique</h2>
          <p>{demarcheText}</p>
        </div>
      )}
      {inspirationText && (
        <div className={s.contentWrapper}>
          <h2>Inspirations</h2>
          <p>{inspirationText}</p>
        </div>
      )}
    </>
  );
}
