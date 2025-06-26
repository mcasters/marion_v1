"use client";

import { Type, WorkFull } from "@/lib/type";
import React from "react";

interface Props {
  item: WorkFull;
  isLightbox: boolean;
}
export default function ImageInfos({ item, isLightbox }: Props) {
  if (isLightbox) {
    return (
      <>
        <p>
          <span>{item.title}</span>
          {` - ${item.technique}`}
          {item.type === Type.SCULPTURE
            ? ` - ${item.height} x ${item.width} x ${item.length} cm - `
            : ` - ${item.height} x ${item.width} cm - `}
          <time>{new Date(item.date).getFullYear()}</time>
        </p>
      </>
    );
  } else
    return (
      <>
        <h2>{item.title}</h2>
        <p>
          {item.technique}
          {item.type === Type.SCULPTURE
            ? ` - ${item.height} x ${item.width} x ${item.length} cm`
            : ` - ${item.height} x ${item.width} cm`}
          <br />
          <time>{new Date(item.date).getFullYear()}</time>
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
