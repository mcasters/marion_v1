"use client";

import s from "./lightbox.module.css";
import { Photo, PhotoEnhanced } from "@/lib/type";
import React, { useState } from "react";
import ArrowPrev from "@/components/icons/arrowPrev";
import ArrowNext from "@/components/icons/arrowNext";
import ZoomImage from "@/components/image/lightbox/zoomImage";
import { onNext, onPrev } from "@/components/image/common";

type Props = {
  photos: Photo[] | PhotoEnhanced[];
  index: number;
  onClose: () => void;
  isSmall: boolean;
};

export default function Lightbox({ photos, index, onClose, isSmall }: Props) {
  const [active, setActive] = useState(index | 0);

  return (
    <div className={s.container}>
      {photos.map((p, i) => (
        <ZoomImage
          key={p.src}
          photo={p}
          isActive={i === active}
          onClose={onClose}
          onPrev={() => onPrev(active, setActive, photos)}
          onNext={() => onNext(active, setActive, photos)}
          isSmall={isSmall}
        />
      ))}
      {!isSmall && photos.length > 1 && (
        <>
          <button
            className={`${s.prev} iconButton`}
            onClick={() => onPrev(active, setActive, photos)}
          >
            <ArrowPrev />
          </button>
          <button
            className={`${s.next} iconButton`}
            onClick={() => onNext(active, setActive, photos)}
          >
            <ArrowNext />
          </button>
        </>
      )}
    </div>
  );
}
