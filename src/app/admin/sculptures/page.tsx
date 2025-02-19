import ItemListComponent from "@/components/admin/item/ItemListComponent";
import CategoryComponent from "@/components/admin/item/category/CategoryComponent";
import s from "@/styles/admin/Admin.module.css";
import React from "react";
import { Type } from "@/lib/type";
import { getEmptyItem } from "@/utils/commonUtils";
import ItemForm from "@/components/admin/form/ItemForm";
import { getAllCategories, getYears } from "@/app/actions";
import { createItem } from "@/app/actions/drawings/admin";

export default async function Sculptures() {
  const categories = await getAllCategories(Type.SCULPTURE);
  const years = await getYears(Type.SCULPTURE, true);

  return (
    <>
      <h1 className={s.pageTitle}>Contenus des pages Sculptures</h1>
      <ItemListComponent categories={categories} years={years} />
      <ItemForm
        categories={categories}
        item={getEmptyItem(Type.SCULPTURE)}
        itemAction={createItem}
      />
      <CategoryComponent itemType={Type.SCULPTURE} categories={categories} />
    </>
  );
}
