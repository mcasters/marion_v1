import ItemListComponent from "@/components/admin/item/ItemListComponent";
import CategoryComponent from "@/components/admin/item/category/CategoryComponent";
import { getPaintingsFull } from "@/app/api/peinture/getPaintings";
import { getPaintingCategoriesFull } from "@/app/api/peinture/category/getCategories";
import s from "@/styles/admin/Admin.module.css";
import React from "react";
import { Type } from "@/lib/db/item";
import { getEmptyItem } from "@/utils/commonUtils";
import AddItemForm from "@/components/admin/form/AddItemForm";

export default async function Peintures() {
  const paintings = await getPaintingsFull();
  const categories = await getPaintingCategoriesFull();

  return (
    <>
      <h1 className={s.pageTitle}>Contenus des pages Peintures</h1>
      <ItemListComponent items={paintings} categories={categories} />
      <AddItemForm categories={categories} item={getEmptyItem(Type.PAINTING)} />
      <CategoryComponent itemType={Type.PAINTING} categories={categories} />
    </>
  );
}
