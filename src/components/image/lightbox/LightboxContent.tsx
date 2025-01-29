"use client";

import s from "./Lightbox.module.css";
import { Photo } from "@/lib/model";
import { useState } from "react";
import ArrowPrev from "@/components/icons/ArrowPrev";
import ArrowNext from "@/components/icons/ArrowNext";
import ZoomImage from "@/components/image/lightbox/ZoomImage";

type Props = {
  photos: Photo[];
  index: number;
  onClose: () => void;
  isSmall: boolean;
};

export default function LightboxContent({
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
          photo={p}
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
