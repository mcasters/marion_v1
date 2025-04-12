"use client";

import Image from "next/image";

import DeleteButton from "@/components/admin/form/deleteButton";
import s from "../adminList.module.css";
import { Category, ItemFull, PostFull, Type } from "@/lib/type";
import React, { useMemo } from "react";
import { deleteItem, updateItem } from "@/app/actions/item-post/admin";
import AddUpdateButton from "@/components/admin/form/addUpdateButton";
import { getMainImage } from "@/utils/commonUtils";

interface Props {
  item: ItemFull | PostFull;
  categories?: Category[];
}

export default function RowListComponent({ item, categories }: Props) {
  const itemCategory = useMemo(() => {
    return categories && item.type !== Type.POST
      ? categories.find((category) => category.id === item.categoryId)
      : null;
  }, [categories, item]);

  const src = useMemo(() => {
    if (item.type === Type.POST) {
      const mainImage = getMainImage(item);
      return mainImage
        ? `/images/post/${mainImage.filename}`
        : item.images[0]?.filename
          ? `/images/post/${item.images[0].filename}`
          : "";
    } else {
      return `/images/${item.type}/${item.images[0].filename}`;
    }
  }, [item]);

  return (
    <ul className={s.itemList}>
      <li className={s.itemTitle}>{item.title}</li>
      {item.type !== Type.POST && (
        <li className={s.itemCategory}>{itemCategory?.value}</li>
      )}
      <li className={s.itemYear}>{new Date(item.date).getFullYear()}</li>
      <li className={s.itemImage}>
        {src !== "" && (
          <Image
            src={src}
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
          categories={item.type !== Type.POST ? categories : undefined}
        />
      </li>
      <li className={s.icon}>
        <DeleteButton action={() => deleteItem(item.id, item.type)} />
      </li>
    </ul>
  );
}
