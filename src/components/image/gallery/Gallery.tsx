"use client";

import React, { useState } from "react";
import { DEVICE } from "@/constants/image";
import { PhotoTab } from "@/lib/type";
import s from "./Gallery.module.css";
import useWindowSize from "@/components/hooks/useWindowSize";
import Image from "next/image";
import { createPortal } from "react-dom";
import LightboxContent from "@/components/image/lightbox/LightboxContent";

interface Props {
  photos: PhotoTab;
}

export default function Gallery({ photos }: Props) {
  const [index, setIndex] = useState(-1);
  const window = useWindowSize();
  const isSmall = window.innerWidth < DEVICE.SMALL;
  const photoToDisplay = isSmall ? photos.sm : photos.md;

  return (
    <>
      <div className={s.container}>
        {photoToDisplay.map((p, index) => {
          return (
            <Image
              defaultValue={index}
              key={index}
              src={p.src}
              alt={p.alt}
              width={p.width}
              height={p.height}
              style={{
                objectFit: "contain",
              }}
              className={`${s.image}`}
              onClick={() => setIndex(index)}
            />
          );
        })}
      </div>
      {index >= 0 &&
        createPortal(
          <LightboxContent
            photos={isSmall ? photos.md : photos.lg}
            index={index}
            onClose={() => setIndex(-1)}
            isSmall={isSmall}
          />,
          document.body,
        )}
    </>
  );
}
