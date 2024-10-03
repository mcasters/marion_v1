"use client";

import { Image as IImage } from "@/lib/db/item";
import s from "./Slider.module.css";
import { useEffect, useMemo, useState } from "react";
import { IMAGE_SIZE } from "@/constants/image";
import Image from "next/image";

type Props = {
  images: IImage[];
  isSmall: boolean;
  autoPlay: boolean;
};

export default function Slider({ images, isSmall, autoPlay }: Props) {
  const [active, setActive] = useState(0);

  const photos = useMemo(
    () =>
      images.map((image) => {
        const width = image.width;
        const height = image.height;
        return {
          src: `/images/miscellaneous/${isSmall ? "md/" : ""}${image.filename}`,
          width: isSmall ? IMAGE_SIZE.MD_PX : width,
          height: isSmall
            ? Math.round((height / width) * IMAGE_SIZE.MD_PX)
            : height,
          alt: "Œuvre de Marion Casters",
        };
      }),
    [images, isSmall],
  );

  const onPrev = () => {
    if (active > 0) {
      setActive(active - 1);
    } else {
      setActive(images.length - 1);
    }
  };

  const onNext = () => {
    if (active < images.length - 1) {
      setActive(active + 1);
    } else {
      setActive(0);
    }
  };

  useEffect(() => {
    function onNext() {
      if (active < images.length - 1) {
        setActive(active + 1);
      } else {
        setActive(0);
      }
    }

    const interval = setInterval(() => {
      onNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [active, images]);

  return (
    <div className={s.slider}>
      {photos.map((p, i) => (
        <div
          key={i}
          className={`${s.slide} ${i === active ? s.active : ""}`}
          style={{ aspectRatio: p.width / p.height }}
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
        <div className={s.prev} onClick={onPrev}>
          {" "}
          &lt;{" "}
        </div>
        <div className={s.next} onClick={onNext}>
          {" "}
          &gt;{" "}
        </div>
      </div>
    </div>
  );
}
