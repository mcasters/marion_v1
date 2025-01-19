"use client";

import RowItemListComponent from "./RowItemListComponent";
import React from "react";
import s from "@/styles/admin/AdminList.module.css";
import { CategoryFull, ItemFull } from "@/lib/db/item";

interface Props {
  items: ItemFull[];
  categories: CategoryFull[];
}
export default function ItemListComponent({ items, categories }: Props) {
  const title = `Liste des ${items[0].type}s`;

  return (
    <div className={s.listContainer}>
      <h2>{title}</h2>
      <div className={s.list}>
        {items &&
          items.map((item: ItemFull) => {
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
