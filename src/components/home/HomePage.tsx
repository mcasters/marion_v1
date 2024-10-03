"use client";

import useWindowSize from "@/components/hooks/useWindowSize";
import { DEVICE } from "@/constants/image";
import React from "react";
import { Image } from "@/lib/db/item";
import Slider from "@/components/image/slideshow/Slider";

export type Props = {
  portraitImages: Image[];
  landscapeImages: Image[];
};

export default function HomePage({ portraitImages, landscapeImages }: Props) {
  const window = useWindowSize();
  const needPortrait = window.innerWidth / window.innerHeight < 0.98;
  const isSmall = window.innerWidth < DEVICE.SMALL;

  console.log(isSmall);
  return (
    <Slider
      images={needPortrait ? portraitImages : landscapeImages}
      isSmall={isSmall}
      autoPlay
    />
  );
}
