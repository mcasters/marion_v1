"use client";

import s from "./monoLayout.module.css";
import { WorkFull } from "@/lib/type";
import React, { useMemo, useState } from "react";
import { getItemPhotoTab } from "@/utils/imageUtils";
import { useMetas } from "@/app/context/metaProvider";
import ImageInfos from "@/components/image/common/imageInfos";
import Lightbox from "@/components/image/lightbox/lightbox";
import useWindowSize from "@/components/hooks/useWindowSize";
import { DEVICE } from "@/constants/image";
import { META } from "@/constants/admin";
import FormattedImage from "@/components/image/formattedImage.tsx";

interface Props {
  item: WorkFull;
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

  const photoForButton = isSmall ? photos.sm[0] : photos.md[0];
  const photoForLightbox = isSmall ? photos.md[0] : photos.lg[0];

  return (
    <article className={s.article}>
      <figure className={s.imageContainer}>
        {photoForButton && (
          <FormattedImage
            photo={photoForButton}
            priority={priority}
            onClick={() => setIndex(0)}
            maxWidth={isSmall ? 80 : 45}
            maxHeight={isSmall ? 45 : 58}
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
