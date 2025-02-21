"use client";

import CategoryListComponent from "@/components/admin/item/category/CategoryListComponent";
import CategoryForm from "@/components/admin/form/CategoryForm";
import s from "../../../../styles/admin/AdminList.module.css";
import { Category, ItemFull, Type } from "@/lib/type";
import { getEmptyCategory } from "@/utils/commonUtils";

interface Props {
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING;
  categories: Category[];
  items: ItemFull[];
}
export default function CategoryComponent({ categories, type, items }: Props) {
  const title = "Gestion des catégories";

  return (
    <div className={s.listContainer}>
      <h2>{title}</h2>
      <CategoryListComponent
        type={type}
        categories={categories}
        items={items}
      />
      <CategoryForm category={getEmptyCategory()} type={type} items={items} />
    </div>
  );
}
