"use client";

import { useMemo, useState } from "react";
import { Lightbox as YetLightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { TYPE } from "@/constants";
import { DEVICE, IMAGE_SIZE } from "@/constants/image";
import s from "@/components/image/lightbox.module.css";
import { Image as IImage } from "@/lib/db/item";
import Image from "next/image";

type Props = {
  images: IImage[];
  type: string;
  alt: string;
  isCentered?: boolean;
};

export default function Lightbox({
  images,
  type,
  alt,
  isCentered = false,
}: Props) {
  const oneImage = type === TYPE.PAINTING || images.length === 1;
  const [index, setIndex] = useState(-1);

  const photos = useMemo(
    () =>
      images.map((image) => {
        const width = image.width;
        const height = image.height;
        return {
          src: `/images/${type}/${image.filename}`,
          width,
          height,
          alt,
          srcSet: [
            {
              src: `/images/${type}/md/${image.filename}`,
              width: IMAGE_SIZE.MD_PX,
              height: Math.round((height / width) * IMAGE_SIZE.MD_PX),
            },
            {
              src: `/images/${type}/${image.filename}`,
              width: width,
              height: height,
            },
          ],
        };
      }),
    [images, type, alt],
  );

  return (
    <div className={!oneImage ? s.imageGridContainer : undefined}>
      {images.map((image, index) => {
        return (
          <button
            key={image.id}
            type="button"
            onClick={() => {
              setIndex(index);
            }}
            className={oneImage ? s.imageWrap : s.sculptureImagesWrap}
            style={{
              aspectRatio: image.width / image.height,
            }}
          >
            <Image
              loader={({ src, width }) => {
                const directory = width <= DEVICE.SMALL ? "sm" : "md";
                return `/images/${type}/${directory}/${src}`;
              }}
              src={`${image.filename}`}
              fill
              sizes="(max-width: 768px) 80vw, 60vw"
              style={{
                objectFit: "contain",
              }}
              alt={alt}
              priority={isCentered}
            />
          </button>
        );
      })}

      <YetLightbox
        index={index}
        slides={photos}
        open={index >= 0}
        close={() => setIndex(-1)}
        controller={{
          closeOnPullUp: true,
          closeOnPullDown: true,
          closeOnBackdropClick: true,
        }}
        styles={{
          slide: { padding: "1rem" },
        }}
      />
    </div>
  );
}
