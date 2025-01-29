import { Type } from "@/lib/type";
import ItemListComponent from "@/components/admin/item/ItemListComponent";
import CategoryComponent from "@/components/admin/item/category/CategoryComponent";
import s from "@/styles/admin/Admin.module.css";
import React from "react";
import ItemForm from "@/components/admin/form/ItemForm";
import { getEmptyItem } from "@/utils/commonUtils";
import {
  getDrawingCategoriesFull,
  getDrawingsFull,
  getYearsForDrawing,
} from "@/app/actions/drawings";
import { createDrawing } from "@/app/actions/drawings/admin";

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
      <ItemForm
        categories={categories}
        item={getEmptyItem(Type.DRAWING)}
        itemAction={createDrawing}
      />
      <CategoryComponent itemType={Type.DRAWING} categories={categories} />
    </>
  );
}
