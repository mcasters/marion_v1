"use client";

import ItemComponent from "@/components/item/ItemComponent";
import s from "@/styles/ItemPage.module.css";
import React, { useEffect, useState } from "react";
import { ItemFull } from "@/lib/type";

interface Props {
  items: ItemFull[];
  years: number[];
}

export default function ItemYearComponent({ items, years }: Props) {
  const [year, setYear] = useState<string>("");
  const [itemsByYear, setItemsByYear] = useState<ItemFull[]>([]);

  useEffect(() => {
    if (year !== "") {
      const tab = items.filter(
        (item) => new Date(item.date).getFullYear().toString() === year,
      );
      setItemsByYear(tab);
    }
  }, [year, items]);

  return (
    <>
      <div className={`${s.categoryTitle} ${s.paintingCategoryTitle}`}>
        <h2>Par année</h2>
        <label className={s.yearSelect}>
          <select
            name="year"
            value={year.toString()}
            onChange={(e) => setYear(e.target.value)}
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
      </div>
      {itemsByYear.length > 0 &&
        itemsByYear.map((item) => <ItemComponent key={item.id} item={item} />)}
    </>
  );
}
