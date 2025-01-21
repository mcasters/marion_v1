import ItemListComponent from "@/components/admin/item/ItemListComponent";
import CategoryComponent from "@/components/admin/item/category/CategoryComponent";
import { getSculpturesFull } from "@/app/api/sculpture/getSculptures";
import { getSculptureCategoriesFull } from "@/app/api/sculpture/category/getCategories";
import s from "@/styles/admin/Admin.module.css";
import React from "react";
import { Type } from "@/lib/db/item";
import { getEmptyItem } from "@/utils/commonUtils";
import ItemForm from "@/components/admin/form/ItemForm";

export default async function Sculptures() {
  const sculptures = await getSculpturesFull();
  const categories = await getSculptureCategoriesFull();

  return (
    <>
      <h1 className={s.pageTitle}>Contenus des pages Sculptures</h1>
      <ItemListComponent items={sculptures} categories={categories} />
      <ItemForm categories={categories} item={getEmptyItem(Type.SCULPTURE)} />
      <CategoryComponent itemType={Type.SCULPTURE} categories={categories} />
    </>
  );
}
