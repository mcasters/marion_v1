"use client";

import Image from "next/image";

import DeleteButton from "@/components/admin/form/deleteButton";
import s from "../adminList.module.css";
import { Category, ItemFull } from "@/lib/type";
import React, { useMemo } from "react";
import { deleteItem, updateItem } from "@/app/actions/items/admin";
import AddUpdateButton from "@/components/admin/form/addUpdateButton";

interface Props {
  item: ItemFull;
  categories: Category[];
}

export default function RowItemListComponent({ item, categories }: Props) {
  const filename = item.images[0]?.filename;
  const itemCategory = useMemo(() => {
    return categories.find((category) => category.id === item.categoryId);
  }, [categories, item]);

  return (
    <ul className={s.itemList}>
      <li className={s.itemTitle}>{item.title}</li>
      <li className={s.itemCategory}>{itemCategory?.value}</li>
      <li className={s.itemYear}>{new Date(item.date).getFullYear()}</li>
      <li className={s.itemImage}>
        {filename && (
          <Image
            src={`/images/${item.type}/sm/${filename}`}
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
      <li className={s.icon}>
        <AddUpdateButton
          item={item}
          action={updateItem}
          categories={categories}
        />
      </li>
      <li className={s.icon}>
        <DeleteButton action={() => deleteItem(item.id, item.type)} />
      </li>
    </ul>
  );
}
