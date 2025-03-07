"use client";

import s from "./ItemsGalleryComponent.module.css";
import { ItemFull, Type } from "@/lib/type";
import React, { useMemo, useState } from "react";
import { getItemPhotoTabEnhanced } from "@/utils/imageUtils";
import { useMetas } from "@/app/context/metaProvider";
import { META } from "@/constants/specific";
import Image from "next/image";
import useWindowSize from "@/components/hooks/useWindowSize";
import { DEVICE } from "@/constants/image";
import { createPortal } from "react-dom";
import LightboxContentEnhanced from "@/components/image/lightbox/LightboxContentEnhanced";
import { useTheme } from "@/app/context/themeProvider";

interface Props {
  items: ItemFull[];
}
export default function ItemsGalleryComponent({ items }: Props) {
  const metas = useMetas();
  const theme = useTheme();
  const [index, setIndex] = useState(-1);
  const window = useWindowSize();
  const isSmall = window.innerWidth < DEVICE.SMALL;
  const photosEnhanced = useMemo(
    () =>
      getItemPhotoTabEnhanced(
        items,
        `${items[0].title} - ${items[0].type} de ${metas.get(META.SITE_TITLE)}`,
      ),
    [items],
  );
  const photosToDisplay = isSmall ? photosEnhanced.sm : photosEnhanced.md;
  const photosForLightbox = isSmall ? photosEnhanced.md : photosEnhanced.lg;

  return (
    <div className={s.container}>
      {photosToDisplay.map((p, i) => {
        return (
          <>
            <article
              className={s.article}
              style={{ color: theme.linkHoverColor }}
              key={i}
              onClick={() => setIndex(i)}
            >
              <figure>
                <Image
                  defaultValue={i}
                  key={p.src}
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  style={{
                    objectFit: "contain",
                  }}
                  className={s.image}
                />
              </figure>
              <figcaption className={s.infoContainer}>
                <div>
                  <h2>{p.item.title}</h2>
                  <p>
                    <time>{new Date(p.item.date).getFullYear()}</time>
                    {", "}
                    {p.item.technique}
                    {","}
                    <br />
                    {p.item.type === Type.SCULPTURE
                      ? `${p.item.height} x ${p.item.width} x ${p.item.length} cm`
                      : `${p.item.height} x ${p.item.width} cm`}
                  </p>
                  {p.item.description !== "" && (
                    <>
                      <br />
                      <p>{p.item.description}</p>
                    </>
                  )}
                  {p.item.isToSell && (
                    <>
                      <br />
                      <p>
                        {`prix : ${p.item.price} euros`}
                        {p.item.sold ? "vendu" : ""}
                      </p>
                    </>
                  )}
                </div>
              </figcaption>
            </article>
            {index >= 0 &&
              createPortal(
                <LightboxContentEnhanced
                  photos={photosForLightbox}
                  index={index}
                  onClose={() => setIndex(-1)}
                  isSmall={isSmall}
                />,
                document.body,
              )}
          </>
        );
      })}
    </div>
  );
}
