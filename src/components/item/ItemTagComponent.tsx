"use client";

import {CategoryFull, ItemFull} from "@/lib/type";
import React, {useMemo} from "react";
import s from "@/components/item/ItemTagComponent.module.css";
import ItemComponent from "@/components/item/ItemComponent";

interface Props {
  tag: string;
  category?: CategoryFull;
  items?: ItemFull[];
}
export default function ItemTagComponent({ tag, category, items }: Props) {
  const _items: ItemFull[] | undefined = useMemo(() => {
    return items ? items : category?.items;
  }, [items, category]);

  return (
    <>
      <div className={s.info}>
        <h2 className={`${s.tagTitle}`}>{tag}</h2>
        {category &&
          (category.content.title !== "" || category.content.text !== "") && (
            <div className={s.categoryContent}>
              <h4>{category.content.title}</h4>
              <p>{category.content.text}</p>
            </div>
          )}
      </div>
      {_items &&
        _items.map((item, index) => <ItemComponent key={item.id} item={item} priority={index < 1} />)}
    </>
  );
}
