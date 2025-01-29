"use client";

import CategoryListComponent from "@/components/admin/item/category/CategoryListComponent";
import CategoryForm from "@/components/admin/form/CategoryForm";
import s from "../../../../styles/admin/AdminList.module.css";
import { CategoryFull, Type } from "@/lib/model";
import { createCategorySculpture } from "@/app/actions/sculptures/admin";
import { createCategoryDrawing } from "@/app/actions/drawings/admin";
import { createCategoryPainting } from "@/app/actions/paintings/admin";

interface Props {
  categories: CategoryFull[];
  itemType: Type;
}
export default function CategoryComponent({ categories, itemType }: Props) {
  const title = "Gestion des catégories";
  const action =
    itemType === Type.SCULPTURE
      ? createCategorySculpture
      : itemType === Type.DRAWING
        ? createCategoryDrawing
        : createCategoryPainting;
  return (
    <div className={s.listContainer}>
      <h2>{title}</h2>
      <CategoryListComponent itemType={itemType} categories={categories} />
      <CategoryForm categoryAction={action} />
    </div>
  );
}
