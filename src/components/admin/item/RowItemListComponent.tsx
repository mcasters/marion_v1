"use client";

import Image from "next/image";

import DeleteButton from "@/components/admin/form/DeleteButton";
import UpdateItemButton from "@/components/admin/form/item/UpdateItemButton";
import s from "../../../styles/admin/adminList.module.css";
import { Category, ItemFull } from "@/lib/type";
import { useMemo } from "react";

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
        <UpdateItemButton item={item} categories={categories} />
      </li>
      <li className={s.icon}>
        <DeleteButton id={item.id} type={item.type} isCategory={false} />
      </li>
    </ul>
  );
}
