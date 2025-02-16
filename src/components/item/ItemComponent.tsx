"use client";

import s from "./ItemComponent.module.css";
import Lightbox from "@/components/image/lightbox/Lightbox";
import { ItemFull, Type } from "@/lib/type";
import { useMemo } from "react";
import { getPhotoTab } from "@/utils/imageUtils";

interface Props {
  item: ItemFull;
  priority: boolean;
}
export default function ItemComponent({ item, priority }: Props) {
  const { photos } = useMemo(() => getPhotoTab(item), [item]);

  return (
    <article id={`${item.id}`} className={s.article}>
      <figure>
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
