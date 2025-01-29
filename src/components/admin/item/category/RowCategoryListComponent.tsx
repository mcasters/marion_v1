"use client";

import DeleteButton from "@/components/admin/form/DeleteButton";
import s from "../../../../styles/admin/AdminList.module.css";
import { CategoryFull, Type } from "@/lib/model";
import UpdateCategoryButton from "@/components/admin/form/UpdateCategoryButton";
import { deleteCategoryPainting } from "@/app/actions/paintings/admin";
import { deleteCategoryDrawing } from "@/app/actions/drawings/admin";
import { deleteCategorySculpture } from "@/app/actions/sculptures/admin";

interface Props {
  category: CategoryFull;
  itemType: Type;
}

export default function RowCategoryListComponent({
  category,
  itemType,
}: Props) {
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
          {category.count} {itemType}(s)
        </span>
      </li>
      <li className={s.itemIcon}>
        <UpdateCategoryButton
          category={category}
          itemType={itemType}
          disabled={category.value === "Sans catégorie"}
        />
      </li>
      <li className={s.itemIcon}>
        <DeleteButton
          deleteAction={
            itemType === Type.PAINTING
              ? deleteCategoryPainting
              : itemType === Type.DRAWING
                ? deleteCategoryDrawing
                : deleteCategorySculpture
          }
          id={category.id}
          disabled={category.count > 0 || category.value === "Sans catégorie"}
        />
      </li>
    </ul>
  );
}
