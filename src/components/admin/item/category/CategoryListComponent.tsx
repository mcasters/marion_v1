"use client";

import RowCategoryListComponent from "./RowCategoryListComponent";
import React from "react";
import s from "../../../../styles/admin/AdminList.module.css";
import { CategoryFull, Type } from "@/lib/type";

interface Props {
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING;
  categories: CategoryFull[];
}
export default function CategoryListComponent({ type, categories }: Props) {
  const title = "Liste des catégories";
  const message = `Une catégorie ne peut être supprimée que lorsqu'il n'y a pas ou plus de ${type} qui y est classée.`;

  return (
    <div className={s.listContainer}>
      <h3>{title}</h3>
      <div className={`${s.list} ${s.categoryList}`}>
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
