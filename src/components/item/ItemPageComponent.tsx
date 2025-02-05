"use client";

import { CategoryFull, Type } from "@/lib/type";
import Link from "next/link";
import React from "react";
import { PATH } from "@/constants/specific/routes";
import s from "./ItemComponent.module.css";
import Image from "next/image";
import { GENERAL } from "@/constants/specific/metaHtml";
import { DEVICE } from "@/constants/image";

interface Props {
  type: Type;
  categories: CategoryFull[];
}
export default function ItemPageComponent({ categories, type }: Props) {
  const path = PATH[type];
  const isSmall = window.innerWidth < DEVICE.SMALL;

  return (
    <ul className={s.itemPageList}>
      {categories.map((category) => {
        return (
          <li key={category.key}>
            <Link href={`/${path}/${category.key}`}>
              <div>
                <h3>{category.value}</h3>
                {category.image && (
                  <div
                    className={s.imageWrap}
                    style={{
                      aspectRatio: category.image.width / category.image.height,
                    }}
                  >
                    <Image
                      src={`/images/${path}/${isSmall ? "sm" : "md"}/${category.image.filename}`}
                      fill
                      alt={GENERAL.ALT_PHOTO_PRESENTATION}
                      style={{
                        objectFit: "contain",
                      }}
                      priority
                      unoptimized
                    />
                  </div>
                )}
                <p>{category.text}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
