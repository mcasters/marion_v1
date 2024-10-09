"use client";

import s from "./ItemComponent.module.css";
import { getImagesTab, isSculptureFull } from "@/utils/commonUtils";
import { useMemo } from "react";
import { DrawingFull, PaintingFull, SculptureFull } from "@/lib/db/item";
import Lightbox from "@/components/image/lightbox/Lightbox";

interface Props {
  item: SculptureFull | PaintingFull | DrawingFull;
}
export default function ItemComponent({ item }: Props) {
  const images = useMemo(() => getImagesTab(item), [item]);
  return (
    <article id={`${item.id}`} className={s.article}>
      <figure>
        <Lightbox
          images={images}
          alt={`${item.title} - ${item.type} de Marion Casters`}
          type={item.type}
        />
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
            {isSculptureFull(item)
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
