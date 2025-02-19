import ItemListComponent from "@/components/admin/item/ItemListComponent";
import CategoryComponent from "@/components/admin/item/category/CategoryComponent";
import s from "@/styles/admin/Admin.module.css";
import React from "react";
import { Type } from "@/lib/type";
import { getEmptyItem } from "@/utils/commonUtils";
import ItemForm from "@/components/admin/form/ItemForm";
import { getAllCategories, getYears } from "@/app/actions";
import { createItem } from "@/app/actions/drawings/admin";

export default async function Peintures() {
  const categories = await getAllCategories(Type.PAINTING);
  const years = await getYears(Type.PAINTING, true);

  return (
    <>
      <h1 className={s.pageTitle}>Contenus des pages Peintures</h1>
      <ItemListComponent categories={categories} years={years} />
      <ItemForm
        categories={categories}
        item={getEmptyItem(Type.PAINTING)}
        itemAction={createItem}
      />
      <CategoryComponent itemType={Type.PAINTING} categories={categories} />
    </>
  );
}
