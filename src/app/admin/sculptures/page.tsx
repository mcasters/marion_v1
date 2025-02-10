import ItemListComponent from "@/components/admin/item/ItemListComponent";
import CategoryComponent from "@/components/admin/item/category/CategoryComponent";
import s from "@/styles/admin/Admin.module.css";
import React from "react";
import { Type } from "@/lib/type";
import { getEmptyItem } from "@/utils/commonUtils";
import ItemForm from "@/components/admin/form/ItemForm";
import {
  getAdminSculptureCategories,
  getYearsForSculpture,
} from "@/app/actions/sculptures";
import { createSculpture } from "@/app/actions/sculptures/admin";

export default async function Sculptures() {
  const categories = await getAdminSculptureCategories();
  const years = await getYearsForSculpture();

  return (
    <>
      <h1 className={s.pageTitle}>Contenus des pages Sculptures</h1>
      <ItemListComponent categories={categories} years={years} />
      <ItemForm
        categories={categories}
        item={getEmptyItem(Type.SCULPTURE)}
        itemAction={createSculpture}
      />
      <CategoryComponent itemType={Type.SCULPTURE} categories={categories} />
    </>
  );
}
