"use client";

import { useMemo, useState } from "react";
import { Lightbox as YetLightbox } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { TYPE } from "@/constants";
import { DEVICE, IMAGE_SIZE } from "@/constants/image";
import s from "@/components/image/lightbox.module.css";
import { Image as IImage } from "@/lib/db/item";
import Image from "next/image";
import NextJsImage from "@/components/image/NextImage";

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
  const isSmall = window ? window.innerWidth < DEVICE.SMALL : true;
  const [index, setIndex] = useState(-1);

  const photos = useMemo(
    () =>
      images.map((image) => {
        const width = image.width;
        const height = image.height;
        return {
          src: `/images/${type}/${isSmall ? "md/" : ""}${image.filename}`,
          width: isSmall ? IMAGE_SIZE.MD_PX : width,
          height: isSmall
            ? Math.round((height / width) * IMAGE_SIZE.MD_PX)
            : height,
          alt,
        };
      }),
    [images, type, alt, isSmall],
  );

  return (
    <>
      <div className={!oneImage ? s.imageGridContainer : s.imageContainer}>
        {images.map((image, index) => {
          return (
            <button
              key={image.id}
              className={s.imageWrap}
              type="button"
              onClick={() => {
                setIndex(index);
              }}
              style={{
                aspectRatio: image.width / image.height,
              }}
            >
              <Image
                src={`/images/${type}/${isSmall ? "sm" : "md"}/${image.filename}`}
                fill
                priority={isCentered}
                style={{ objectFit: "contain" }}
                alt={alt}
                unoptimized
              />
            </button>
          );
        })}

        <YetLightbox
          index={index}
          open={index >= 0}
          close={() => setIndex(-1)}
          slides={photos}
          render={{
            slide: NextJsImage,
            buttonPrev: oneImage ? () => null : undefined,
            buttonNext: oneImage ? () => null : undefined,
          }}
          controller={{
            closeOnPullUp: true,
            closeOnPullDown: true,
            closeOnBackdropClick: true,
          }}
          styles={{
            slide: { padding: "1rem" },
          }}
          plugins={[Zoom]}
          zoom={{
            maxZoomPixelRatio: 3,
            zoomInMultiplier: 1.5,
          }}
        />
      </div>
    </>
  );
}
