"use client";

import React, { useState } from "react";
import { DEVICE } from "@/constants/image";
import s from "@/components/image/lightbox/Lightbox.module.css";
import { PhotoTab } from "@/lib/type";
import Image from "next/image";
import useWindowSize from "@/components/hooks/useWindowSize";
import { createPortal } from "react-dom";
import LightboxContent from "@/components/image/lightbox/LightboxContent";

type Props = {
  photos: PhotoTab;
  isCentered?: boolean;
};

export default function Lightbox({ photos, isCentered = false }: Props) {
  const window = useWindowSize();
  const isSmall = window.innerWidth < DEVICE.SMALL;
  const [index, setIndex] = useState(-1);

  const photosForButton = isSmall ? photos.sm : photos.md;
  const photosForLightbox = isSmall ? photos.md : photos.lg;

  return (
    <>
      <div
        className={
          photos.sm.length > 1 ? s.imageGridContainer : s.imageContainer
        }
      >
        {photosForButton.map((p, index) => {
          const ratio = p.width / p.height;
          return (
            <button
              key={p.src}
              className={`${ratio > 1 ? s.landscape : s.portrait}`}
              type="button"
              onClick={() => {
                setIndex(index);
              }}
              style={{
                aspectRatio: ratio,
              }}
            >
              <Image
                src={p.src}
                fill
                priority={isCentered}
                style={{ objectFit: "contain" }}
                alt={p.alt}
                unoptimized
              />
            </button>
          );
        })}

        {index >= 0 &&
          createPortal(
            <LightboxContent
              photos={photosForLightbox}
              index={index}
              onClose={() => setIndex(-1)}
              isSmall={isSmall}
            />,
            document.body,
          )}
      </div>
    </>
  );
}
