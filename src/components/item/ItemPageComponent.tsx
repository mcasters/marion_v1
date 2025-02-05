"use client";

import { CategoryFull, Type } from "@/lib/type";
import Link from "next/link";
import React from "react";
import s from "./ItemComponent.module.css";
import Image from "next/image";
import { GENERAL } from "@/constants/specific/metaHtml";
import { DEVICE } from "@/constants/image";
import { PATH } from "@/constants/specific/routes";

interface Props {
  type: Type;
  categories: CategoryFull[];
}
export default function ItemPageComponent({ categories, type }: Props) {
  const isSmall = window.innerWidth < DEVICE.SMALL;

  return (
    <ul className={s.itemPageList}>
      {categories.map((category) => {
        return (
          <li key={category.key}>
            <Link href={`/${PATH[type]}/${category.key}`}>
              <div>
                <h3>{category.value}</h3>
                {category.content.image.filename !== "" && (
                  <div
                    className={s.imageWrap}
                    style={{
                      aspectRatio:
                        category.content.image.width /
                        category.content.image.height,
                    }}
                  >
                    <Image
                      src={`/images/${type}/${isSmall ? "sm" : "md"}/${category.content.image.filename}`}
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
                <p>{category.content.text}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
