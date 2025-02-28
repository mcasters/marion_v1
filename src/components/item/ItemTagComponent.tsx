"use client";

import { Category, ItemFull } from "@/lib/type";
import React from "react";
import s from "@/components/item/ItemTagComponent.module.css";
import ItemComponent from "@/components/item/ItemComponent";

interface Props {
  tag: string;
  category?: Category;
  items: ItemFull[];
}
export default function ItemTagComponent({ tag, category, items }: Props) {
  return (
    <>
      <div className={s.infoCategory}>
        <h2 className={`${s.tagTitle}`}>{tag}</h2>
        {category &&
          (category.content.title !== "" || category.content.text !== "") && (
            <div className={s.categoryContent}>
              <h3>{category.content.title}</h3>
              <p>{category.content.text}</p>
            </div>
          )}
      </div>
      {items.map((item, index) => (
        <ItemComponent key={item.id} item={item} priority={index < 1} />
      ))}
    </>
  );
}
