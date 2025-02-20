"use client";

import CategoryListComponent from "@/components/admin/item/category/CategoryListComponent";
import CategoryForm from "@/components/admin/form/CategoryForm";
import s from "../../../../styles/admin/AdminList.module.css";
import { CategoryFull, Type } from "@/lib/type";
import { getEmptyCategory } from "@/utils/commonUtils";

interface Props {
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING;
  categories: CategoryFull[];
}
export default function CategoryComponent({ categories, type }: Props) {
  const title = "Gestion des catégories";

  return (
    <div className={s.listContainer}>
      <h2>{title}</h2>
      <CategoryListComponent type={type} categories={categories} />
      <CategoryForm category={getEmptyCategory()} type={type} />
    </div>
  );
}
