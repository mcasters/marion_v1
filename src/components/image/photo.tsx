"use client";

import { Photo } from "@/lib/type";
import React from "react";
import Image from "next/image";

interface Props {
  photo: Photo;
  priority: boolean;
  width: number;
  height: number;
  onClick: () => void;
}
export default function Photo({
  photo,
  priority,
  width,
  height,
  onClick,
}: Props) {
  const ratio = Math.round((photo?.width / photo?.height) * 10000);
  const isLandscape = ratio >= 10300;

  return (
    <Image
      src={photo.src}
      width={photo.width}
      height={photo.height}
      priority={priority}
      style={{
        objectFit: "contain",
        width: isLandscape ? `${width}vw` : "auto",
        height: !isLandscape ? `${height}vh` : "auto",
        cursor: onClick ? "pointer" : undefined,
      }}
      alt={photo.alt}
      unoptimized
      onClick={onClick}
      title="Agrandir"
    />
  );
}
