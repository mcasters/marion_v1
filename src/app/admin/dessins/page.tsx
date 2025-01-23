import { Type } from "@/lib/db/item";
import ItemListComponent from "@/components/admin/item/ItemListComponent";
import CategoryComponent from "@/components/admin/item/category/CategoryComponent";
import s from "@/styles/admin/Admin.module.css";
import React from "react";
import {
  getDrawingsFull,
  getYearsForDrawing,
} from "@/app/api/dessin/getDrawings";
import { getDrawingCategoriesFull } from "@/app/api/dessin/category/getCategories";
import ItemForm from "@/components/admin/form/ItemForm";
import { getEmptyItem } from "@/utils/commonUtils";

export default async function Dessins() {
  const drawings = await getDrawingsFull();
  const categories = await getDrawingCategoriesFull();
  const years = await getYearsForDrawing();

  return (
    <>
      <h1 className={s.pageTitle}>Contenus des pages Dessins</h1>
      <ItemListComponent
        items={drawings}
        categories={categories}
        years={years}
      />
      <ItemForm categories={categories} item={getEmptyItem(Type.DRAWING)} />
      <CategoryComponent itemType={Type.DRAWING} categories={categories} />
    </>
  );
}
