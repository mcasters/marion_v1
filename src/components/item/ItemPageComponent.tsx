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
        //const image = category.item.images[0];
        const image = {
          width: 40,
          height: 30,
          filename: "coucou.jpg",
        };
        return (
          <li key={category.key}>
            <Link href={`/${path}/${category.key}`}>
              <div>
                <h3>{category.value}</h3>
                {category.item && (
                  <div
                    className={s.imageWrap}
                    style={{
                      aspectRatio: image.width / image.height,
                    }}
                  >
                    <Image
                      src={`/images/${path}/${isSmall ? "sm" : "md"}/${image.filename}`}
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
                <p>{category.description}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
