"use client";

import CategoryListComponent from "@/components/admin/item/category/CategoryListComponent";
import CategoryForm from "@/components/admin/form/CategoryForm";
import s from "../../../../styles/admin/AdminList.module.css";
import { CategoryFull, Type } from "@/lib/db/item";

interface Props {
  categories: CategoryFull[];
  itemType: Type;
}
export default function CategoryComponent({ categories, itemType }: Props) {
  const title = "Gestion des catégories";
  return (
    <div className={s.listContainer}>
      <h2>{title}</h2>
      <CategoryListComponent itemType={itemType} categories={categories} />
      <CategoryForm itemType={itemType} />
    </div>
  );
}
