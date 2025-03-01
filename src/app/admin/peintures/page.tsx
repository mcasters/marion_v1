import ItemListComponent from "@/components/admin/item/ItemListComponent";
import CategoryComponent from "@/components/admin/item/category/CategoryComponent";
import s from "@/styles/admin/Admin.module.css";
import React from "react";
import { Type } from "@/lib/type";
import { getEmptyItem } from "@/utils/commonUtils";
import ItemForm from "@/components/admin/form/ItemForm";
import { getAllCategories, getAllItems, getYears } from "@/app/actions/items";
import { createItem } from "@/app/actions/items/admin";

export default async function Peintures() {
  const categories = await getAllCategories(Type.PAINTING);
  const years = await getYears(Type.PAINTING, true);
  const items = await getAllItems(Type.PAINTING);

  return (
    <>
      <h1 className={s.title1}>Contenus des pages Peintures</h1>
      <ItemListComponent categories={categories} years={years} items={items} />
      <ItemForm
        categories={categories}
        item={getEmptyItem(Type.PAINTING)}
        itemAction={createItem}
      />
      <CategoryComponent
        type={Type.PAINTING}
        categories={categories}
        items={items}
      />
    </>
  );
}
