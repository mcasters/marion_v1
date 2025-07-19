"use client";

import { Photo, Type, WorkFull } from "@/lib/type";
import s from "./imageInfos.module.css";

interface Props {
  item: WorkFull | undefined;
  photo?: Photo;
  isForLightbox?: boolean;
  isMono?: boolean;
}
export default function ImageInfos({
  item,
  photo = undefined,
  isForLightbox = false,
  isMono = false,
}: Props) {
  const dotToComma = (number: number): string => {
    return number.toString().replace(".", ",");
  };

  return (
    <figcaption className={s.infoContainer}>
      {photo && (
        <p>
          <span>{photo.title}</span> - {new Date(photo.date).getFullYear()}
        </p>
      )}
      {item && isForLightbox && (
        <p>
          <span>{item.title}</span>
          {` - ${item.technique}`}
          {item.type === Type.SCULPTURE
            ? ` - ${dotToComma(item.height)} x ${dotToComma(item.width)} x ${dotToComma(item.length)} cm - `
            : ` - ${dotToComma(item.height)} x ${dotToComma(item.width)} cm - `}
          <time>{new Date(item.date).getFullYear()}</time>
        </p>
      )}
      {item && !isForLightbox && (
        <>
          <h2>{item.title}</h2>
          <p>
            {item.technique}
            {item.type === Type.SCULPTURE
              ? ` - ${dotToComma(item.height)} x ${dotToComma(item.width)} x ${dotToComma(item.length)} cm`
              : ` - ${dotToComma(item.height)} x ${dotToComma(item.width)} cm`}
            {isMono && (
              <>
                <br />
                <time>{new Date(item.date).getFullYear()}</time>
              </>
            )}
            {!isMono && (
              <>
                {` - `}
                <time>{new Date(item.date).getFullYear()}</time>
              </>
            )}
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
      )}
    </figcaption>
  );
}
