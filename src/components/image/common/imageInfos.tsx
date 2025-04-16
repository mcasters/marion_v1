"use client";

import { Type, workFull } from "@/lib/type";
import React from "react";

interface Props {
  item: workFull;
  isLightbox: boolean;
}
export default function ImageInfos({ item, isLightbox }: Props) {
  if (isLightbox) {
    return (
      <>
        <h3>{item.title}</h3>
        <p>
          <time>{new Date(item.date).getFullYear()}</time>
          {`, ${item.technique}`}
          {item.type === Type.SCULPTURE
            ? `, ${item.height} x ${item.width} x ${item.length} cm`
            : `, ${item.height} x ${item.width} cm`}
          {item.description !== "" && <>{`, ${item.description}`}</>}
          {item.isToSell && <>{`, prix : ${item.price} euros`}</>}
        </p>
      </>
    );
  } else
    return (
      <>
        <h2>{item.title}</h2>
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
      </>
    );
}
