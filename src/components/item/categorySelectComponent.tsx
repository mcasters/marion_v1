"use client";

import { CategoryFull, Type } from "@/lib/type";
import React, { useEffect, useState } from "react";
import s from "./ItemComponent.module.css";
import Image from "next/image";
import { GENERAL } from "@/constants/specific/metaHtml";

interface Props {
  type: Type;
  categories: CategoryFull[];
  onChange: (categoryKey: string) => void;
}
export default function CategorySelectComponent({
  categories,
  type,
  onChange,
}: Props) {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>("");

  useEffect(() => {
    onChange(selectedCategoryKey);
  }, [selectedCategoryKey]);

  return (
    <ul className={s.ul}>
      <li>
        <button
          onClick={() => setSelectedCategoryKey("")}
          className={`${s.categoryButton} ${selectedCategoryKey === "" ? s.isSelected : ""}`}
        >
          Toutes catégories
        </button>
      </li>
      {categories.map((category) => {
        return (
          <li key={category.key}>
            <button
              onClick={() => setSelectedCategoryKey(category.key)}
              className={`${s.categoryButton} ${selectedCategoryKey === category.key ? s.isSelected : ""}`}
            >
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
                    src={`/images/${type}/sm/${category.content.image.filename}`}
                    fill
                    alt={GENERAL.ALT_PHOTO_PRESENTATION}
                    style={{
                      objectFit: "cover",
                    }}
                    priority
                    unoptimized
                    className={s.image}
                  />
                </div>
              )}
              {category.value}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
