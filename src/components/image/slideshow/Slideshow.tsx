"use client";

import { Photo } from "@/lib/type";
import { useEffect, useState } from "react";
import s from "@/components/image/slideshow/Slider.module.css";
import Image from "next/image";
import ArrowPrev from "@/components/icons/ArrowPrev";
import ArrowNext from "@/components/icons/ArrowNext";
import { onNext, onPrev } from "@/components/image/common";

type Props = {
  photos: Photo[];
  autoPlay: boolean;
  isSmall: boolean;
};

export default function Slideshow({ photos, autoPlay, isSmall }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        onNext(active, setActive, photos);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [active, photos, autoPlay]);

  return (
    photos.length > 0 && (
      <div style={{ position: "relative" }}>
        {photos.map((p, i) => (
          <Image
            key={i}
            alt={p.alt}
            src={p.src}
            width={p.width}
            height={p.height}
            className={`${s.slide} ${i === active ? s.active : ""}`}
            loading="eager"
            draggable={false}
            style={{
              objectFit: "contain",
            }}
            priority={i < 0}
          />
        ))}
        {!isSmall && (
          <>
            <button
              className={`${s.prev} iconButton`}
              onClick={() => onPrev(active, setActive, photos)}
              aria-label="Image précédente"
              title="Image précédente"
            >
              <ArrowPrev />
            </button>
            <button
              className={`${s.next} iconButton`}
              onClick={() => onNext(active, setActive, photos)}
              aria-label="Image suivante"
              title="Image suivante"
            >
              <ArrowNext />
            </button>
          </>
        )}
      </div>
    )
  );
}
