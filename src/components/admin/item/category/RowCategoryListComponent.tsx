"use client";

import DeleteButton from "@/components/admin/form/DeleteButton";
import s from "../../../../styles/admin/AdminList.module.css";
import { Category, ItemFull, Type } from "@/lib/type";
import UpdateCategoryButton from "@/components/admin/form/UpdateCategoryButton";

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
    <ul className={s.item}>
      <li className={s.itemTitle}>
        <span className={s.name}>
          {category.value === "Sans catégorie"
            ? "SANS CATÉGORIE"
            : category.value}
        </span>
      </li>
      <li className={s.itemInfo}>
        <span>
          {countItems} {type}(s)
        </span>
      </li>
      <li className={s.itemIcon}>
        <UpdateCategoryButton
          category={category}
          items={items}
          type={type}
          disabled={category.value === "Sans catégorie"}
        />
      </li>
      <li className={s.itemIcon}>
        <DeleteButton
          id={category.id}
          type={type}
          isCategory={true}
          disabled={countItems > 0 || category.value === "Sans catégorie"}
        />
      </li>
    </ul>
  );
}
