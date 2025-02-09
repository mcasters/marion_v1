"use client";

import { CategoryFull, Type } from "@/lib/type";
import React, { useState } from "react";
import s from "./ItemComponent.module.css";
import Image from "next/image";
import { GENERAL } from "@/constants/specific/metaHtml";

interface Props {
  type: Type;
  categories: CategoryFull[];
  onCategoryChange: (categoryKey: string) => void;
  years: number[];
  onYearChange: (year: number) => void;
}
export default function SelectComponent({
  type,
  categories,
  onCategoryChange,
  years,
  onYearChange,
}: Props) {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(0);

  const changeCategory = (key: string) => {
    onCategoryChange(key);
    setSelectedCategoryKey(key);
    setSelectedYear(0);
  };

  const changeYear = (year: number) => {
    onYearChange(year);
    setSelectedYear(year);
    setSelectedCategoryKey("");
  };

  return (
    <>
      <ul className={s.ul}>
        <li>
          <button
            onClick={() => changeCategory("")}
            className={`${s.categoryButton} ${selectedCategoryKey === "" ? s.isSelected : ""}`}
          >
            Toutes catégories
          </button>
        </li>
        {categories.map((category) => {
          return (
            <li key={category.key}>
              <button
                onClick={() => changeCategory(category.key)}
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
      <label>
        <select
          className={s.yearSelect}
          name="year"
          value={selectedYear.toString()}
          onChange={(e) => changeYear(Number(e.target.value))}
        >
          <option value="">-- Année --</option>
          {years &&
            years.map((year) => (
              <option key={year} value={year.toString()}>
                {year.toString()}
              </option>
            ))}
        </select>
      </label>
    </>
  );
}
