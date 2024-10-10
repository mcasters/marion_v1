"use client";

import React, { useMemo, useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import { DEVICE, IMAGE_SIZE } from "@/constants/image";
import { Image } from "@/lib/db/item";
import { createPortal } from "react-dom";
import LightboxContent from "@/components/image/lightbox/LightboxContent";
import useWindowSize from "@/components/hooks/useWindowSize";

interface Props {
  images: Image[];
  title: string;
  alt: string;
}

export default function Gallery({ images, title, alt }: Props) {
  const [index, setIndex] = useState(-1);
  const window = useWindowSize();
  const isSmall = window.innerWidth < DEVICE.SMALL;

  const photosForGallery = useMemo(
    () =>
      images.map((image) => {
        const width = image.width;
        const height = image.height;
        return {
          src: `/images/post/${isSmall ? "sm/" : "md/"}${image.filename}`,
          width: isSmall ? IMAGE_SIZE.SM_PX : IMAGE_SIZE.MD_PX,
          height: isSmall
            ? Math.round((height / width) * IMAGE_SIZE.SM_PX)
            : Math.round((height / width) * IMAGE_SIZE.MD_PX),
          alt,
          title,
        };
      }),
    [images, alt, title, isSmall],
  );

  const photosForLightbox = useMemo(
    () =>
      images.map((image) => {
        const width = image.width;
        const height = image.height;
        return {
          src: `/images/post/${isSmall ? "md/" : ""}${image.filename}`,
          width: isSmall ? IMAGE_SIZE.MD_PX : width,
          height: isSmall
            ? Math.round((height / width) * IMAGE_SIZE.MD_PX)
            : height,
          alt,
        };
      }),
    [images, alt, isSmall],
  );

  return (
    <>
      <RowsPhotoAlbum
        photos={photosForGallery}
        onClick={({ index: current }) => setIndex(current)}
        breakpoints={[DEVICE.SMALL, DEVICE.MEDIUM]}
        componentsProps={() => ({
          button: {
            "aria-label": "Agrandir",
          },
        })}
      />
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
    </>
  );
}
