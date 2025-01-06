"use client";

import RowItemListComponent from "./RowItemListComponent";
import React from "react";
import s from "@/styles/admin/AdminList.module.css";
import {
  Category,
  DrawingFull,
  PaintingFull,
  SculptureFull,
  Type,
} from "@/lib/db/item";

interface Props {
  type: Type;
  items: PaintingFull[] | SculptureFull[] | DrawingFull[];
  categories: Category[];
}
export default function ItemListComponent({ type, items, categories }: Props) {
  const title = `Liste des ${type}s`;

  console.log(items[0]);
  return (
    <div className={s.listContainer}>
      <h2>{title}</h2>
      <div className={s.list}>
        {items &&
          items.map((item: PaintingFull | SculptureFull | DrawingFull) => {
            return (
              <RowItemListComponent
                key={item.id}
                item={item}
                categories={categories}
              />
            );
          })}
      </div>
    </div>
  );
}
