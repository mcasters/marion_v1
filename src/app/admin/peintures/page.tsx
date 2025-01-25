import ItemListComponent from "@/components/admin/item/ItemListComponent";
import CategoryComponent from "@/components/admin/item/category/CategoryComponent";
import s from "@/styles/admin/Admin.module.css";
import React from "react";
import { Type } from "@/lib/db/item";
import { getEmptyItem } from "@/utils/commonUtils";
import ItemForm from "@/components/admin/form/ItemForm";
import {
  getPaintingCategoriesFull,
  getPaintingsFull,
  getYearsForPainting,
} from "@/app/actions/paintings";

export default async function Peintures() {
  const paintings = await getPaintingsFull();
  const categories = await getPaintingCategoriesFull();
  const years = await getYearsForPainting();

  return (
    <>
      <h1 className={s.pageTitle}>Contenus des pages Peintures</h1>
      <ItemListComponent
        items={paintings}
        categories={categories}
        years={years}
      />
      <ItemForm categories={categories} item={getEmptyItem(Type.PAINTING)} />
      <CategoryComponent itemType={Type.PAINTING} categories={categories} />
    </>
  );
}
