"use client";

import Image from "next/image";

import DeleteButton from "@/components/admin/form/DeleteButton";
import UpdateButton from "@/components/admin/form/UpdateButton";
import s from "../../../styles/admin/AdminList.module.css";
import {
  Category,
  DrawingFull,
  PaintingFull,
  SculptureFull,
} from "@/lib/db/item";
import { isSculptureFull } from "@/utils/commonUtils";

interface Props {
  item: PaintingFull | SculptureFull | DrawingFull;
  categories: Category[];
}

export default function RowItemListComponent({ item, categories }: Props) {
  const filename = isSculptureFull(item)
    ? item.images[0]?.filename
    : item.imageFilename;
  return (
    <ul className={s.item}>
      <li className={s.itemTitle}>
        <span className={s.name}>{item.title}</span>
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
        <UpdateButton item={item} type={item.type} categories={categories} />
      </li>
      <li className={s.itemIcon}>
        <DeleteButton api={`api/${item.type}/delete/${item.id}`} />
      </li>
    </ul>
  );
}
