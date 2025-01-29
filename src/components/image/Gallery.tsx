"use client";

import React, { useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import { DEVICE } from "@/constants/image";
import { PhotoTab } from "@/lib/model";
import { createPortal } from "react-dom";
import LightboxContent from "@/components/image/lightbox/LightboxContent";
import useWindowSize from "@/components/hooks/useWindowSize";

interface Props {
  photos: PhotoTab;
}

export default function Gallery({ photos }: Props) {
  const [index, setIndex] = useState(-1);
  const window = useWindowSize();
  const isSmall = window.innerWidth < DEVICE.SMALL;

  return (
    <>
      <RowsPhotoAlbum
        photos={isSmall ? photos.sm : photos.md}
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
