import { Type } from "@/lib/db/item";
import ItemListComponent from "@/components/admin/item/ItemListComponent";
import ItemForm from "@/components/admin/form/ItemForm";
import CategoryComponent from "@/components/admin/item/category/CategoryComponent";
import s from "@/styles/admin/Admin.module.css";
import React from "react";
import { getDrawingsFull } from "@/app/api/dessin/getDrawings";
import { getDrawingCategoriesFull } from "@/app/api/dessin/category/getCategories";

export default async function Dessins() {
  const drawings = await getDrawingsFull();
  const categories = await getDrawingCategoriesFull();

  return (
    <>
      <h1 className={s.pageTitle}>Contenus des pages Dessins</h1>
      <ItemListComponent items={drawings} categories={categories} />
      <ItemForm categories={categories} typeAdd={Type.DRAWING} />
      <CategoryComponent itemType={Type.DRAWING} categories={categories} />
    </>
  );
}
