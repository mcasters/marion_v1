"use client";

import RowCategoryListComponent from "./RowCategoryListComponent";
import React from "react";
import s from "../../../../styles/admin/AdminList.module.css";
import { CategoryFull } from "@/lib/db/item";

interface Props {
  type: string;
  categories: CategoryFull[];
}
export default function CategoryListComponent({ type, categories }: Props) {
  const title = "Liste des catégories";
  const message = `Une catégorie ne peut être supprimée que lorsqu'il n'y a pas ou plus de ${type} qui y est classée.`;

  return (
    <div className={s.listContainer}>
      <h4>{title}</h4>
      <div className={s.list}>
        {categories.map((category) => {
          return (
            <RowCategoryListComponent
              key={category.id}
              category={category}
              type={type}
            />
          );
        })}
      </div>
      <p>{message}</p>
    </div>
  );
}
