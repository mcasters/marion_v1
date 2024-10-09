"use client";

import useWindowSize from "@/components/hooks/useWindowSize";
import { DEVICE, IMAGE_SIZE } from "@/constants/image";
import React, { useMemo } from "react";
import { Image, Photo } from "@/lib/db/item";
import Slideshow from "@/components/image/slideshow/Slideshow";

export type Props = {
  portraitImages: Image[];
  landscapeImages: Image[];
};

export default function HomePage({ portraitImages, landscapeImages }: Props) {
  const window = useWindowSize();
  const needPortrait = window.innerWidth / window.innerHeight < 0.98;
  const isSmall = window.innerWidth < DEVICE.SMALL;

  const portraitPhotos: Photo[] = useMemo(
    () =>
      portraitImages.map((image) => {
        const width = image.width;
        const height = image.height;
        return {
          src: `/images/miscellaneous/${isSmall ? "md/" : ""}${image.filename}`,
          width: isSmall ? IMAGE_SIZE.MD_PX : width,
          height: isSmall
            ? Math.round((height / width) * IMAGE_SIZE.MD_PX)
            : height,
          alt: "Œuvre de Marion Casters",
        };
      }),
    [portraitImages, isSmall],
  );

  const landscapePhotos: Photo[] = useMemo(
    () =>
      landscapeImages.map((image) => {
        const width = image.width;
        const height = image.height;
        return {
          src: `/images/miscellaneous/${isSmall ? "md/" : ""}${image.filename}`,
          width: isSmall ? IMAGE_SIZE.MD_PX : width,
          height: isSmall
            ? Math.round((height / width) * IMAGE_SIZE.MD_PX)
            : height,
          alt: "Œuvre de Marion Casters",
        };
      }),
    [landscapeImages, isSmall],
  );

  return (
    <Slideshow
      photos={needPortrait ? portraitPhotos : landscapePhotos}
      autoPlay
    />
  );
}
