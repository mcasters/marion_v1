import { TYPE } from "@/constants";
import ItemListComponent from "@/components/admin/item/ItemListComponent";
import ItemForm from "@/components/admin/form/ItemForm";
import CategoryComponent from "@/components/admin/item/category/CategoryComponent";
import { getPaintingsFull } from "@/app/api/peinture/getPaintings";
import { getPaintingCategoriesFull } from "@/app/api/peinture/category/getCategories";
import s from "@/styles/admin/Admin.module.css";
import React from "react";

export default async function Peintures() {
  const paintings = await getPaintingsFull();
  const categories = await getPaintingCategoriesFull();

  return (
    <>
      <h1 className={s.pageTitle}>Contenus des pages Peintures</h1>
      <ItemListComponent
        type={TYPE.PAINTING}
        items={paintings}
        categories={categories}
      />
      <ItemForm categories={categories} typeAdd={TYPE.PAINTING} />
      <CategoryComponent type={TYPE.PAINTING} categories={categories} />
    </>
  );
}
