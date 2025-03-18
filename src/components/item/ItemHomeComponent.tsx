"use client";

import { Category, Type } from "@/lib/type";
import React from "react";
import s from "@/components/item/ItemHomeComponent.module.css";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/app/context/themeProvider";

interface Props {
  type: Type;
  categories: Category[];
  years: number[];
}
export default function ItemHomeComponent({ categories, type, years }: Props) {
  const theme = useTheme();
  return (
    <>
      <p className={`${s.tagTitle}`}>Catégories :</p>`
      <ul className={s.ul}>
        {categories.map((category) => {
          const content = category.content;
          const noImage =
            category.key === "no-category" || content.image.filename === "";
          return (
            <li key={category.key}>
              <Link
                href={`${type}s/${category.key}`}
                className={`${s.link} ${s.categoryLink}`}
                title={`Catégorie ${category.value}`}
              >
                {!noImage && (
                  <Image
                    src={`/images/${type}/sm/${content.image.filename}`}
                    width={content.image.width}
                    height={content.image.height}
                    alt=""
                    style={{
                      objectFit: "cover",
                    }}
                    priority
                    unoptimized
                    className={s.image}
                  />
                )}
                <div
                  className={
                    noImage
                      ? s.noImageOverLayer
                      : `${s.imageOverLayer} imageOverLayer`
                  }
                >
                  {category.value}
                </div>
              </Link>
              <style jsx>{`
                .imageOverLayer {
                  color: ${theme.linkHoverColor};
                }
              `}</style>
            </li>
          );
        })}
      </ul>
      <p className={`${s.tagTitle}`}>Années :</p>
      <ul className={s.ul}>
        {years.map((year) => {
          return (
            <li key={year}>
              <Link
                href={`${type}s/par-annee/${year}`}
                className={`${s.link} ${s.yearLink}`}
                title={`Année ${year}`}
              >
                <div className={s.noImageOverLayer}>{year}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
