"use client";

import { Category, ItemFull, ItemLayout } from "@/lib/type";
import React from "react";
import s from "@/components/item/ItemsComponent.module.css";
import ItemComponent from "@/components/item/ItemComponent";

interface Props {
  tag: string;
  items: ItemFull[];
  category?: Category;
  layout: ItemLayout;
}
export default function ItemsComponent({
  tag,
  items,
  category,
  layout,
}: Props) {
  return (
    <div
      className={
        layout === ItemLayout.DOUBLE
          ? s.doubleContent
          : layout === ItemLayout.MONO
            ? s.monoContent
            : layout === ItemLayout.SCULPTURE
              ? s.sculptureContent
              : s.multipleContent
      }
    >
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
      {items.map((item, index) => (
        <ItemComponent
          key={item.id}
          item={item}
          priority={index < 2}
          layout={layout}
        />
      ))}
    </div>
  );
}
