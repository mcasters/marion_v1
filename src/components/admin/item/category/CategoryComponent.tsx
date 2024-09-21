"use client";

import CategoryListComponent from "@/components/admin/item/category/CategoryListComponent";
import CategoryForm from "@/components/admin/form/CategoryForm";
import s from "../../../../styles/admin/AdminList.module.css";
import { CategoryFull } from "@/lib/db/item";

interface Props {
  type: string;
  categories: CategoryFull[];
}
export default function CategoryComponent({ type, categories }: Props) {
  const title = "Gestion des catégories";
  return (
    <div className={s.listContainer}>
      <h2>{title}</h2>
      <CategoryListComponent type={type} categories={categories} />
      <CategoryForm type={type} />
    </div>
  );
}
