"use client";

import s from "./monoLayout.module.css";
import { ItemFull } from "@/lib/type";
import React, { useMemo, useState } from "react";
import { getItemPhotoTab } from "@/utils/imageUtils";
import { useMetas } from "@/app/context/metaProvider";
import ImageInfos from "@/components/image/common/ImageInfos";
import Image from "next/image";
import { createPortal } from "react-dom";
import Lightbox from "@/components/image/lightbox/Lightbox";
import useWindowSize from "@/components/hooks/useWindowSize";
import { DEVICE } from "@/constants/image";
import { META } from "@/constants/admin";

interface Props {
  item: ItemFull;
  priority: boolean;
}
export default function MonoLayoutComponent({ item, priority }: Props) {
  const metas = useMetas();
  const window = useWindowSize();
  const isSmall = window.innerWidth < DEVICE.SMALL;
  const [index, setIndex] = useState(-1);

  const photos = useMemo(
    () =>
      getItemPhotoTab(
        item,
        `${item.title} - ${item.type} de ${metas.get(META.SITE_TITLE)}`,
      ),
    [item],
  );

  const photosForButton = isSmall ? photos.sm : photos.md;
  const photosForLightbox = isSmall ? photos.md : photos.lg;

  return (
    <article className={s.article}>
      <figure className={s.imageContainer}>
        {photosForButton.map((p, index) => {
          const ratio = Math.round((p.width / p.height) * 10000);
          return (
            <Image
              key={p.src}
              src={p.src}
              width={p.width}
              height={p.height}
              priority={priority}
              style={{ objectFit: "contain" }}
              alt={p.alt}
              unoptimized
              className={`${ratio >= 10300 ? s.landscape : s.portrait}`}
              onClick={() => {
                setIndex(index);
              }}
              title="Agrandir"
            />
          );
        })}

        {index >= 0 &&
          createPortal(
            <Lightbox
              photos={photosForLightbox}
              index={index}
              onClose={() => setIndex(-1)}
              isSmall={isSmall}
            />,
            document.body,
          )}
      </figure>
      <figcaption className={s.infoContainer}>
        <ImageInfos item={item} isLightbox={false} />
      </figcaption>
    </article>
  );
}
