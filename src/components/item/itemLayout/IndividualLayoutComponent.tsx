"use client";

import s from "./IndividualLayoutComponent.module.css";
import ImageWithLightbox from "@/components/image/lightbox/ImageWithLightbox";
import { ItemFull, ItemLayout } from "@/lib/type";
import React, { useMemo } from "react";
import { getItemPhotoTab } from "@/utils/imageUtils";
import { useMetas } from "@/app/context/metaProvider";
import { META } from "@/constants/specific";
import ImageInfos from "@/components/image/common/ImageInfos";

interface Props {
  item: ItemFull;
  priority: boolean;
  layout: ItemLayout.DOUBLE | ItemLayout.MONO | ItemLayout.SCULPTURE;
}
export default function IndividualLayoutComponent({
  item,
  priority,
  layout,
}: Props) {
  const metas = useMetas();
  const photos = useMemo(
    () =>
      getItemPhotoTab(
        item,
        `${item.title} - ${item.type} de ${metas.get(META.SITE_TITLE)}`,
      ),
    [item],
  );

  return (
    <article
      className={
        layout === ItemLayout.DOUBLE
          ? s.doubleArticle
          : layout === ItemLayout.MONO
            ? s.monoArticle
            : s.sculptureArticle
      }
    >
      <figure className={s.imageContainer}>
        <ImageWithLightbox photos={photos} priority={priority} />
      </figure>
      <figcaption className={s.infoContainer}>
        <ImageInfos item={item} isLightbox={false} />
      </figcaption>
    </article>
  );
}
