"use client";

import RowCategoryListComponent from "./RowCategoryListComponent";
import React from "react";
import s from "../../../../styles/admin/AdminList.module.css";
import { Category, ItemFull, Type } from "@/lib/type";

interface Props {
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING;
  categories: Category[];
  items: ItemFull[];
}
export default function CategoryListComponent({
  type,
  categories,
  items,
}: Props) {
  const title = "Liste des catégories";
  const message = `Une catégorie ne peut être supprimée que lorsqu'il n'y a pas ou plus de ${type} qui y est classée.`;

  return (
    <div className={s.listContainer}>
      <h3>{title}</h3>
      <div className={`${s.list} ${s.categoryList}`}>
        {categories.map((category) => {
          let itemTab;
          if (category.key === "no-category")
            itemTab = items.filter((item) => item.categoryId === null);
          else
            itemTab = items.filter((item) => item.categoryId === category.id);
          return (
            <RowCategoryListComponent
              key={category.id}
              category={category}
              items={itemTab}
              type={type}
            />
          );
        })}
      </div>
      <p>{message}</p>
    </div>
  );
}
