"use client";

import Image from "next/image";

import DeleteButton from "@/components/admin/form/deleteButton";
import s from "@/components/admin/adminList.module.css";
import React from "react";
import { Category, Item, Type } from "@/lib/type.ts";
import { getImageSrc } from "@/lib/utils/commonUtils.ts";
import { deleteCategory } from "@/app/actions/item-post/categories/admin.ts";
import { deleteItem } from "@/app/actions/item-post/admin.ts";

type Props = {
  item: Item;
  isSelected: boolean;
  mouseOutside: boolean;
  categories?: Category[];
  onDoubleClick?: (item: Item) => void;
};

export default function RowListComponent({
  item,
  isSelected,
  mouseOutside,
  categories,
  onDoubleClick,
}: Props) {
  const isCategory = item.type === Type.CATEGORY;
  const isPost = item.type === Type.POST;
  const isWork = !isCategory && !isPost;
  const imageSrc = getImageSrc(item);

  return (
    <>
      <ul
        className={`${isSelected ? "selected" : undefined} ${s.itemList}`}
        style={mouseOutside && isSelected ? { opacity: "60%" } : undefined}
        onDoubleClick={() => (onDoubleClick ? onDoubleClick(item) : undefined)}
        title="Modifier"
      >
        <li className={s.itemTitle}>{isCategory ? item.value : item.title}</li>
        <li className={s.itemInfo}>
          {isCategory
            ? `${item.count} ${item.workType}(s)`
            : isPost
              ? new Date(item.date).getFullYear().toString()
              : categories
                ? categories.find((category) => category.id === item.categoryId)
                    ?.value || " "
                : " "}
        </li>
        {isWork && (
          <>
            <li className={s.itemYear}>
              {new Date(item.date).getFullYear().toString()}
            </li>
            <li className={s.itemYear}>{item.isOut && "sortie"}</li>
          </>
        )}
        <li className={s.itemImage}>
          {imageSrc !== "" && (
            <Image
              src={imageSrc}
              alt="Image principale de l'item"
              height={50}
              width={50}
              style={{
                objectFit: "contain",
              }}
              unoptimized
            />
          )}
        </li>
        <li className={s.itemIcon}>
          <DeleteButton
            action={
              isCategory
                ? () => deleteCategory(item.id, item.workType)
                : () => deleteItem(item.id, item.type)
            }
            disabled={
              isCategory
                ? item.count > 0 || item.key === "no-category"
                : undefined
            }
          />
        </li>
      </ul>
    </>
  );
}
