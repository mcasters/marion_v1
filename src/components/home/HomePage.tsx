"use client";

import useWindowSize from "@/components/hooks/useWindowSize";
import { DEVICE } from "@/constants/image";
import React from "react";
import { PhotoTab } from "@/lib/type";
import Slideshow from "@/components/image/slideshow/Slideshow";

export type Props = {
  portraitPhotos: PhotoTab;
  landscapePhotos: PhotoTab;
};

export default function HomePage({ portraitPhotos, landscapePhotos }: Props) {
  const window = useWindowSize();
  const isSmall = window.innerWidth < DEVICE.SMALL;
  const needPortrait = window.innerWidth / window.innerHeight < 0.98;
  const photos = needPortrait ? portraitPhotos : landscapePhotos;

  return (
    <Slideshow
      photos={isSmall ? photos.md : photos.lg}
      autoPlay={true}
      isSmall={isSmall}
    />
  );
}
