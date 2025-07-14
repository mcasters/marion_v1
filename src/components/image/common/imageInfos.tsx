"use client";

import { Photo, Type, WorkFull } from "@/lib/type";

interface Props {
  item: WorkFull | undefined;
  photo?: Photo;
  isForLightbox?: boolean;
}
export default function ImageInfos({
  item,
  photo = undefined,
  isForLightbox = false,
}: Props) {
  const dotToComma = (number: number): string => {
    return number.toString().replace(".", ",");
  };

  if (photo)
    return (
      <>
        <span>{photo.title}</span> - {new Date(photo.date).getFullYear()}
      </>
    );
  if (item && isForLightbox)
    return (
      <>
        <p>
          <span>{item.title}</span>
          {` - ${item.technique}`}
          {item.type === Type.SCULPTURE
            ? ` - ${dotToComma(item.height)} x ${dotToComma(item.width)} x ${dotToComma(item.length)} cm - `
            : ` - ${dotToComma(item.height)} x ${dotToComma(item.width)} cm - `}
          <time>{new Date(item.date).getFullYear()}</time>
        </p>
      </>
    );
  if (item && !isForLightbox)
    return (
      <>
        <h2>{item.title}</h2>
        <p>
          {item.technique}
          {item.type === Type.SCULPTURE
            ? ` - ${dotToComma(item.height)} x ${dotToComma(item.width)} x ${dotToComma(item.length)} cm - `
            : ` - ${dotToComma(item.height)} x ${dotToComma(item.width)} cm - `}
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
  return undefined;
}
