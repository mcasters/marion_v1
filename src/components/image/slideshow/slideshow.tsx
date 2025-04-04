"use client";

import { HomeLayout, Photo } from "@/lib/type";
import { useEffect, useState } from "react";
import s from "@/components/image/slideshow/slider.module.css";
import Image from "next/image";
import ArrowPrev from "@/components/icons/arrowPrev";
import ArrowNext from "@/components/icons/arrowNext";
import { onNext, onPrev } from "@/components/image/common";
import { useMetas } from "@/app/context/metaProvider";
import { getHomeLayout } from "@/utils/commonUtils";

type Props = {
  photos: Photo[];
  autoPlay: boolean;
  isSmall: boolean;
};

export default function Slideshow({ photos, autoPlay, isSmall }: Props) {
  const metas = useMetas();
  const isPlainHomeLayout = getHomeLayout(metas) === HomeLayout.PLAIN;
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
            className={`${isPlainHomeLayout ? `${s.plainSlide} ${s.slide}` : s.slide} ${i === active ? s.active : ""}`}
            loading="eager"
            draggable={false}
            style={{
              objectFit: isPlainHomeLayout ? "cover" : "contain",
            }}
            priority={i < 1}
            unoptimized
          />
        ))}
        {!isSmall && photos.length > 1 && (
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
