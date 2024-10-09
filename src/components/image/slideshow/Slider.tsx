"use client";

import { Photo } from "@/lib/db/item";
import s from "./Slider.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import ArrowNext from "@/components/admin/icons/ArrowNext";
import ArrowPrev from "@/components/admin/icons/ArrowPrev";

type Props = {
  photos: Photo[];
  autoPlay: boolean;
  index?: number;
};

export default function Slider({ photos, autoPlay, index }: Props) {
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

  useEffect(() => {
    function onNext() {
      if (active < photos.length - 1) {
        setActive(active + 1);
      } else {
        setActive(0);
      }
    }

    if (autoPlay) {
      const interval = setInterval(() => {
        onNext();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [active, photos, autoPlay]);

  return (
    <>
      {photos.map((p, i) => (
        <div
          key={i}
          className={`${s.slide} ${i === active ? s.active : ""}`}
          style={{
            aspectRatio: p.width / p.height,
          }}
        >
          <Image
            fill
            alt={p.alt}
            src={p.src}
            loading="eager"
            draggable={false}
            style={{
              objectFit: "contain",
            }}
            unoptimized
          />
        </div>
      ))}
      <div className={s.navigation}>
        <button className={`${s.prev} iconButton`} onClick={onPrev}>
          <ArrowPrev />
        </button>
        <button className={`${s.next} iconButton`} onClick={onNext}>
          <ArrowNext />
        </button>
      </div>
    </>
  );
}
