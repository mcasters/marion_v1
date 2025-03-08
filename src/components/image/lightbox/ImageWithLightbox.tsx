"use client";

import React, { useState } from "react";
import { DEVICE } from "@/constants/image";
import s from "@/components/image/lightbox/Lightbox.module.css";
import { PhotoTab } from "@/lib/type";
import Image from "next/image";
import useWindowSize from "@/components/hooks/useWindowSize";
import { createPortal } from "react-dom";
import Lightbox from "@/components/image/lightbox/Lightbox";

type Props = {
  photos: PhotoTab;
  priority: boolean;
};

export default function ImageWithLightbox({ photos, priority = false }: Props) {
  const window = useWindowSize();
  const isSmall = window.innerWidth < DEVICE.SMALL;
  const isMultiple = photos.sm.length > 1;
  const [index, setIndex] = useState(-1);

  const photosForButton = isSmall ? photos.sm : photos.md;
  const photosForLightbox = isSmall ? photos.md : photos.lg;

  return (
    <div className={isMultiple ? s.imageGridContainer : ""}>
      {photosForButton.map((p, index) => {
        const ratio = Math.round((p.width / p.height) * 10000);
        const onLeft = isMultiple && index % 2 === 0;
        if (isMultiple)
          return (
            <div key={p.src} className={`${onLeft ? s.left : s.right}`}>
              <Image
                src={p.src}
                width={p.width}
                height={p.height}
                priority={priority}
                style={{ objectFit: "contain" }}
                alt={p.alt}
                unoptimized
                className={`${ratio >= 10300 ? s.landscape : s.portrait}`}
                onClick={() => {
                  setIndex(index);
                }}
                title="Agrandir"
              />
            </div>
          );
        else
          return (
            <Image
              key={p.src}
              src={p.src}
              width={p.width}
              height={p.height}
              priority={priority}
              style={{ objectFit: "contain" }}
              alt={p.alt}
              unoptimized
              className={`${ratio >= 10300 ? s.landscape : s.portrait}`}
              onClick={() => {
                setIndex(index);
              }}
              title="Agrandir"
            />
          );
      })}

      {index >= 0 &&
        createPortal(
          <Lightbox
            photos={photosForLightbox}
            index={index}
            onClose={() => setIndex(-1)}
            isSmall={isSmall}
          />,
          document.body,
        )}
    </div>
  );
}
