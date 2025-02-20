"use client";

import Image from "next/image";

import DeleteButton from "@/components/admin/form/DeleteButton";
import UpdateItemButton from "@/components/admin/form/UpdateItemButton";
import s from "../../../styles/admin/AdminList.module.css";
import { CategoryFull, ItemFull } from "@/lib/type";
import { useMemo } from "react";

interface Props {
  item: ItemFull;
  categories: CategoryFull[];
}

export default function RowItemListComponent({ item, categories }: Props) {
  const filename = item.images[0]?.filename;
  const itemCategory = useMemo(() => {
    return categories.find((category) => category.id === item.categoryId);
  }, [categories, item]);

  return (
    <ul className={s.item}>
      <li className={s.itemTitle}>
        <span className={s.name}>{item.title}</span>
      </li>
      <li className={s.itemCategory}>
        <span className={s.name}>{itemCategory?.value}</span>
      </li>
      <li className={s.itemYear}>
        <span className={s.name}>{new Date(item.date).getFullYear()}</span>
      </li>
      <li className={s.itemImage}>
        {filename && (
          <Image
            loader={({ src }) => {
              return `/images/${item.type}/sm/${src}`;
            }}
            src={filename}
            alt="Image principale de l'item"
            height={50}
            width={50}
            style={{
              objectFit: "contain",
            }}
          />
        )}
      </li>
      <li className={s.itemIcon}>
        <UpdateItemButton item={item} categories={categories} />
      </li>
      <li className={s.itemIcon}>
        <DeleteButton id={item.id} type={item.type} isCategory={false} />
      </li>
    </ul>
  );
}
