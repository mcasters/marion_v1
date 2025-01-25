"use client";

import Image from "next/image";

import DeleteButton from "@/components/admin/form/DeleteButton";
import UpdateItemButton from "@/components/admin/form/UpdateItemButton";
import s from "../../../styles/admin/AdminList.module.css";
import { CategoryFull, ItemFull, Type } from "@/lib/db/item";
import { deleteSculpture } from "@/app/actions/sculptures/admin";
import { deletePainting } from "@/app/actions/paintings/admin";

interface Props {
  item: ItemFull;
  categories: CategoryFull[];
}

export default function RowItemListComponent({ item, categories }: Props) {
  const filename = item.images[0]?.filename;
  return (
    <ul className={s.item}>
      <li className={s.itemTitle}>
        <span className={s.name}>{item.title}</span>
      </li>
      <li className={s.itemCategory}>
        <span className={s.name}>{item.category?.value}</span>
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
        <DeleteButton
          deleteAction={
            item.type === Type.PAINTING ? deletePainting : deleteSculpture
          }
          id={item.id}
        />
      </li>
    </ul>
  );
}
