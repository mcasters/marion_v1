"use client";

import s from "./Lightbox.module.css";
import { PhotoEnhanced } from "@/lib/type";
import { useState } from "react";
import ArrowPrev from "@/components/icons/ArrowPrev";
import ArrowNext from "@/components/icons/ArrowNext";
import ZoomImage from "@/components/image/lightbox/ZoomImage";

type Props = {
  photos: PhotoEnhanced[];
  index: number;
  onClose: () => void;
  isSmall: boolean;
};

export default function LightboxContentEnhanced({
  photos,
  index,
  onClose,
  isSmall,
}: Props) {
  const [active, setActive] = useState(index | 0);

  const onPrev = () => {
    if (active > 0) {
      setActive(active - 1);
    } else {
      setActive(photos.length - 1);
    }
  };

  const onNext = () => {
    if (active < photos.length - 1) {
      setActive(active + 1);
    } else {
      setActive(0);
    }
  };

  return (
    <div className={s.container}>
      {photos.map((p, i) => (
        <ZoomImage
          key={p.src}
          photo={{
            src: p.src,
            width: p.width,
            height: p.height,
            alt: p.alt,
            title: p.item.title,
            date: p.item.date,
            isMain: false,
          }}
          isActive={i === active}
          onClose={onClose}
          onPrev={onPrev}
          onNext={onNext}
          isSmall={isSmall}
        />
      ))}
      {!isSmall && photos.length > 1 && (
        <div>
          <button className={`${s.prev} iconButton`} onClick={onPrev}>
            <ArrowPrev />
          </button>
          <button className={`${s.next} iconButton`} onClick={onNext}>
            <ArrowNext />
          </button>
        </div>
      )}
    </div>
  );
}
