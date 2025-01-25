import ItemListComponent from "@/components/admin/item/ItemListComponent";
import CategoryComponent from "@/components/admin/item/category/CategoryComponent";
import s from "@/styles/admin/Admin.module.css";
import React from "react";
import { Type } from "@/lib/db/item";
import { getEmptyItem } from "@/utils/commonUtils";
import ItemForm from "@/components/admin/form/ItemForm";
import {
  getSculptureCategoriesFull,
  getSculpturesFull,
  getYearsForSculpture,
} from "@/app/actions/sculptures";

export default async function Sculptures() {
  const sculptures = await getSculpturesFull();
  const categories = await getSculptureCategoriesFull();
  const years = await getYearsForSculpture();

  return (
    <>
      <h1 className={s.pageTitle}>Contenus des pages Sculptures</h1>
      <ItemListComponent
        items={sculptures}
        categories={categories}
        years={years}
      />
      <ItemForm categories={categories} item={getEmptyItem(Type.SCULPTURE)} />
      <CategoryComponent itemType={Type.SCULPTURE} categories={categories} />
    </>
  );
}
