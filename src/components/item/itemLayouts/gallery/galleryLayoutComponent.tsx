"use client";

import { workFull } from "@/lib/type";
import React, { useMemo } from "react";
import { getItemsPhotoTabEnhanced } from "@/utils/imageUtils";
import { useMetas } from "@/app/context/metaProvider";
import { META } from "@/constants/admin";
import Gallery from "@/components/image/gallery/gallery.tsx";

interface Props {
  items: workFull[];
}
export default function GalleryLayoutComponent({ items }: Props) {
  const metas = useMetas();
  const photosEnhanced = useMemo(
    () =>
      getItemsPhotoTabEnhanced(
        items,
        `${items[0].title} - ${items[0].type} de ${metas.get(META.SITE_TITLE)}`,
      ),
    [items],
  );

  return <Gallery photos={photosEnhanced} />;
}
