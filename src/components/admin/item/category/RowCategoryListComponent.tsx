"use client";

import DeleteButton from "@/components/admin/form/DeleteButton";
import UpdateButton from "@/components/admin/form/UpdateButton";
import s from "../../../../styles/admin/AdminList.module.css";
import { CategoryFull } from "@/lib/db/item";

interface Props {
  category: CategoryFull;
  type: string;
}

export default function RowCategoryListComponent({ category, type }: Props) {
  return (
    <ul className={s.item}>
      <li className={s.itemTitle}>
        <span className={s.name}>{category.value}</span>
      </li>
      <li className={s.itemInfo}>
        <span>
          {category.count} {type}(s)
        </span>
      </li>
      <li className={s.itemIcon}>
        <UpdateButton item={category} type={type} />
      </li>
      <li className={s.itemIcon}>
        <DeleteButton
          api={`api/${type}/category/delete/${category.id}`}
          disabled={category.count > 0}
        />
      </li>
    </ul>
  );
}
