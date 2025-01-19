"use client";

import s from "./ItemComponent.module.css";
import { getPhotoTab } from "@/utils/commonUtils";
import Lightbox from "@/components/image/lightbox/Lightbox";
import { ItemFull, Type } from "@/lib/db/item";
import { useMemo } from "react";

interface Props {
  item: ItemFull;
}
export default function ItemComponent({ item }: Props) {
  const { photos } = useMemo(() => getPhotoTab(item), [item]);

  return (
    <article id={`${item.id}`} className={s.article}>
      <figure>
        <Lightbox photos={photos} />
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
