import { Type } from "@/lib/type";
import ItemListComponent from "@/components/admin/item/ItemListComponent";
import CategoryComponent from "@/components/admin/item/category/CategoryComponent";
import s from "@/styles/admin/Admin.module.css";
import React from "react";
import ItemForm from "@/components/admin/form/ItemForm";
import { getEmptyItem } from "@/utils/commonUtils";
import {
  getDrawCategoriesAdmin,
  getYearsForDraw,
} from "@/app/actions/drawings";
import { createDrawing } from "@/app/actions/drawings/admin";

export default async function Dessins() {
  const categories = await getDrawCategoriesAdmin();
  const years = await getYearsForDraw();

  return (
    <>
      <h1 className={s.pageTitle}>Contenus des pages Dessins</h1>
      <ItemListComponent categories={categories} years={years} />
      <ItemForm
        categories={categories}
        item={getEmptyItem(Type.DRAWING)}
        itemAction={createDrawing}
      />
      <CategoryComponent itemType={Type.DRAWING} categories={categories} />
    </>
  );
}
