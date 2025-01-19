"use client";

import RowCategoryListComponent from "./RowCategoryListComponent";
import React from "react";
import s from "../../../../styles/admin/AdminList.module.css";
import { CategoryFull, Type } from "@/lib/db/item";

interface Props {
  itemType: Type;
  categories: CategoryFull[];
}
export default function CategoryListComponent({ itemType, categories }: Props) {
  const title = "Liste des catégories";
  const message = `Une catégorie ne peut être supprimée que lorsqu'il n'y a pas ou plus de ${itemType} qui y est classée.`;

  return (
    <div className={s.listContainer}>
      <h4>{title}</h4>
      <div className={s.list}>
        {categories.map((category) => {
          return (
            <RowCategoryListComponent
              key={category.id}
              category={category}
              itemType={itemType}
            />
          );
        })}
      </div>
      <p>{message}</p>
    </div>
  );
}
