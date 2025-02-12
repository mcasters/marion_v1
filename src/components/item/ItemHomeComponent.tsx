"use client";

import { CategoryFull, Type } from "@/lib/type";
import React from "react";
import s from "@/components/item/ItemComponent.module.css";
import Image from "next/image";
import Link from "next/link";

interface Props {
  type: Type;
  categories: CategoryFull[];
  years: number[];
}
export default function ItemHomeComponent({ categories, type, years }: Props) {
  return (
    <>
      <p className={s.sectionTitle}>Catégories :</p>
      <ul className={s.ulCategory}>
        {categories.map((category) => {
          const content = category.content;
          const noImage =
            category.key === "no-category" || content.image.filename === "";
          return (
            <li key={category.key}>
              <Link
                href={`${type}s/${category.key}`}
                className={`${s.link} ${noImage ? s.noImageLink : ""}`}
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
                  className={`${noImage ? s.noImageOverLayer : s.imageOverLayer}`}
                >
                  {category.value}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <p className={s.sectionTitle}>Années :</p>
      <ul className={s.ulYear}>
        {years.map((year) => {
          return (
            <li key={year}>
              <Link href={`${type}s/par-annee/${year}`} className={s.yearLink}>
                {year}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
