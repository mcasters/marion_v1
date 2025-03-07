"use client";

import s from "./ItemComponent.module.css";
import Lightbox from "@/components/image/lightbox/Lightbox";
import { ItemFull, ItemLayout, Type } from "@/lib/type";
import { useMemo } from "react";
import { getItemPhotoTab } from "@/utils/imageUtils";
import { useMetas } from "@/app/context/metaProvider";
import { META } from "@/constants/specific";

interface Props {
  item: ItemFull;
  priority: boolean;
  layout: ItemLayout;
}
export default function ItemComponent({ item, priority, layout }: Props) {
  const metas = useMetas();
  const { photos } = useMemo(
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
            : layout === ItemLayout.SCULPTURE
              ? s.sculptureArticle
              : s.multipleArticle
      }
    >
      <figure className={s.imageContainer}>
        <Lightbox photos={photos} priority={priority} />
      </figure>
      <figcaption className={s.infoContainer}>
        <h2>{item.title}</h2>
        <div className={s.info}>
          <p>
            <time>{new Date(item.date).getFullYear()}</time>
            {", "}
            {item.technique}
            {","}
            <br />
            {item.type === Type.SCULPTURE
              ? `${item.height} x ${item.width} x ${item.length} cm`
              : `${item.height} x ${item.width} cm`}
          </p>
          {item.description !== "" && (
            <>
              <br />
              <p>{item.description}</p>
            </>
          )}
          {item.isToSell && (
            <>
              <br />
              <p>
                {`prix : ${item.price} euros`}
                {item.sold ? "vendu" : ""}
              </p>
            </>
          )}
        </div>
      </figcaption>
    </article>
  );
}
