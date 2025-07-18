"use client";

import s from "./sculptureLayout.module.css";
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
export default function SculptureLayoutComponent({ item, priority }: Props) {
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

  const photosForButton = isSmall ? photos.sm : photos.md;
  const photosForLightbox = isSmall ? photos.md : photos.lg;

  return (
    <article className={s.article}>
      <figure>
        <div className={s.imageGridContainer}>
          {photosForButton.map((p, index) => {
            const onLeft = index % 2 === 0;
            return (
              <div key={index} className={`${onLeft ? s.left : s.right}`}>
                <Photo
                  photo={p}
                  priority={priority}
                  onClick={() => setIndex(index)}
                  width={isSmall ? 80 : 25}
                  height={isSmall ? 45 : 40}
                />
              </div>
            );
          })}
          <Lightbox
            photos={photosForLightbox}
            index={index}
            onClose={() => setIndex(-1)}
            isSmall={isSmall}
          />
        </div>
      </figure>
      <figcaption className={s.infoContainer}>
        <ImageInfos item={item} />
      </figcaption>
    </article>
  );
}
