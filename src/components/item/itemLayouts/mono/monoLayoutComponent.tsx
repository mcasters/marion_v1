"use client";

import s from "./monoLayout.module.css";
import { WorkFull } from "@/lib/type";
import React, { useMemo, useState } from "react";
import { getItemPhotoTab } from "@/utils/imageUtils";
import { useMetas } from "@/app/context/metaProvider";
import ImageInfos from "@/components/image/common/imageInfos";
import Lightbox from "@/components/image/lightbox/lightbox";
import useIsSmallWindow from "@/components/hooks/useIsSmallWindow.js";
import { META } from "@/constants/admin";
import Photo from "@/components/image/photo.tsx";

interface Props {
  item: WorkFull;
  priority: boolean;
}
export default function MonoLayoutComponent({ item, priority }: Props) {
  const metas = useMetas();
  const isSmall = useIsSmallWindow();
  const [index, setIndex] = useState(-1);

  const photos = useMemo(
    () =>
      getItemPhotoTab(
        item,
        `${item.title} - ${item.type} de ${metas.get(META.SITE_TITLE)}`,
      ),
    [item],
  );

  const photoForButton = isSmall ? photos.sm[0] : photos.md[0];
  const photoForLightbox = isSmall ? photos.md[0] : photos.lg[0];

  return (
    <article className={s.article}>
      <figure className={s.imageContainer}>
        {photoForButton && (
          <Photo
            photo={photoForButton}
            priority={priority}
            onClick={() => setIndex(0)}
            width={isSmall ? 80 : 45}
            height={isSmall ? 45 : 58}
          />
        )}
        <Lightbox
          photos={[photoForLightbox]}
          index={index}
          onClose={() => setIndex(-1)}
          isSmall={isSmall}
        />
      </figure>
      <figcaption className={s.infoContainer}>
        <ImageInfos item={item} />
      </figcaption>
    </article>
  );
}
