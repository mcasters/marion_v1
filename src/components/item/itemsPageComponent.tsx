"use client";

import { Category, Type, workFull } from "@/lib/type";
import React from "react";
import s from "@/components/item/itemsPageComponent.module.css";
import ItemLayoutComponent from "@/components/item/itemLayouts/itemLayoutComponent";

interface Props {
  tag: string;
  items: workFull[];
  category?: Category;
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING;
}
export default function ItemsPageComponent({
  tag,
  items,
  category,
  type,
}: Props) {
  return (
    <>
      <div className={s.infoCategory}>
        <h2 className={s.tagTitle}>{tag}</h2>
        {category &&
          (category.content.title !== "" || category.content.text !== "") && (
            <div className={s.categoryContent}>
              <h3>{category.content.title}</h3>
              <p>{category.content.text}</p>
            </div>
          )}
      </div>
      <ItemLayoutComponent items={items} type={type} />
    </>
  );
}
