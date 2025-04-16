"use client";

import React from "react";
import style from "@/components/admin/admin.module.css";
import { Category, Type, workFull } from "@/lib/type";
import { getCategoriesFull, getEmptyCategoryFull } from "@/utils/commonUtils";
import AddUpdateButton from "@/components/admin/form/addUpdateButton";
import ListComponent from "@/components/admin/form/item/listComponent";

interface Props {
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING;
  categories: Category[];
  items: workFull[];
}
export default function CategoryComponent({ type, categories, items }: Props) {
  const message = `Une catégorie ne peut être supprimée que lorsqu'il n'y a pas ou plus de ${type} qui y est classée.`;

  return (
    <div className={style.container}>
      <h2 className={style.title2}>Gestion des catégories</h2>
      <ListComponent items={getCategoriesFull(categories, items)} />
      <h5>{message}</h5>
      <AddUpdateButton item={getEmptyCategoryFull(type)} />
    </div>
  );
}
