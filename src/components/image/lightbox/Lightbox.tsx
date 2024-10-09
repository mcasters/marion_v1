"use client";

import React, { useMemo, useState } from "react";
import { TYPE } from "@/constants";
import { DEVICE, IMAGE_SIZE } from "@/constants/image";
import s from "@/components/image/lightbox/Lightbox.module.css";
import { Image as IImage } from "@/lib/db/item";
import Image from "next/image";
import useWindowSize from "@/components/hooks/useWindowSize";
import { createPortal } from "react-dom";
import LightboxContent from "@/components/image/lightbox/LightboxContent";

type Props = {
  images: IImage[];
  type: string;
  alt: string;
  isCentered?: boolean;
};

export default function Lightbox({
  images,
  type,
  alt,
  isCentered = false,
}: Props) {
  const oneImage = type === TYPE.PAINTING || images.length === 1;
  const window = useWindowSize();
  const isSmall = window.innerWidth < DEVICE.SMALL;
  const [index, setIndex] = useState(-1);

  const photosForLightbox = useMemo(
    () =>
      images.map((image) => {
        const width = image.width;
        const height = image.height;
        return {
          src: `/images/${type}/${isSmall ? "md/" : ""}${image.filename}`,
          width: isSmall ? IMAGE_SIZE.MD_PX : width,
          height: isSmall
            ? Math.round((height / width) * IMAGE_SIZE.MD_PX)
            : height,
          alt,
        };
      }),
    [images, type, alt, isSmall],
  );

  return (
    <>
      <div className={!oneImage ? s.imageGridContainer : s.imageContainer}>
        {images.map((image, index) => {
          return (
            <button
              key={image.id}
              className={s.imageWrap}
              type="button"
              onClick={() => {
                setIndex(index);
              }}
              style={{
                aspectRatio: image.width / image.height,
              }}
            >
              <Image
                src={`/images/${type}/${isSmall ? "sm" : "md"}/${image.filename}`}
                fill
                priority={isCentered}
                style={{ objectFit: "contain" }}
                alt={alt}
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
