"use client";

import DeleteButton from "@/components/admin/form/deleteButton";
import s from "../../adminList.module.css";
import { Category, ItemFull, Type } from "@/lib/type";
import UpdateCategoryButton from "@/components/admin/form/category/updateCategoryButton";
import Image from "next/image";
import { deleteCategory } from "@/app/actions/items/admin";

interface Props {
  category: Category;
  items: ItemFull[];
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING;
}

export default function RowCategoryListComponent({
  category,
  items,
  type,
}: Props) {
  const countItems = items.length;

  return (
    <ul className={s.categoryList}>
      <li className={s.categoryTitle}>
        {category.value === "Sans catégorie"
          ? "SANS CATÉGORIE"
          : category.value}
      </li>
      <li className={s.categoryImage}>
        {items.length > 0 && category.content.image.filename !== "" && (
          <Image
            src={`/images/${items[0].type}/sm/${category.content.image.filename}`}
            alt="Image de la catégorie"
            height={50}
            width={50}
            style={{
              objectFit: "cover",
            }}
            unoptimized
          />
        )}
      </li>
      <li className={s.categoryCount}>
        {countItems} {type}(s)
      </li>
      <li className={s.icon}>
        <UpdateCategoryButton
          category={category}
          items={items}
          type={type}
          disabled={category.value === "Sans catégorie"}
        />
      </li>
      <li className={s.icon}>
        <DeleteButton
          action={() => deleteCategory(category.id, type)}
          disabled={countItems > 0 || category.value === "Sans catégorie"}
        />
      </li>
    </ul>
  );
}
