"use client";

import DeleteButton from "@/components/admin/form/DeleteButton";
import s from "../../../../styles/admin/AdminList.module.css";
import { CategoryFull, Type } from "@/lib/type";
import UpdateCategoryButton from "@/components/admin/form/UpdateCategoryButton";

interface Props {
  category: CategoryFull;
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING;
}

export default function RowCategoryListComponent({ category, type }: Props) {
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
          {category.count} {type}(s)
        </span>
      </li>
      <li className={s.itemIcon}>
        <UpdateCategoryButton
          category={category}
          type={type}
          disabled={category.value === "Sans catégorie"}
        />
      </li>
      <li className={s.itemIcon}>
        <DeleteButton
          id={category.id}
          type={type}
          isCategory={true}
          disabled={category.count > 0 || category.value === "Sans catégorie"}
        />
      </li>
    </ul>
  );
}
