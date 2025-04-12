"use client";

import React from "react";
import s from "@/components/admin/adminList.module.css";
import { Category, ItemFull, PostFull, Type } from "@/lib/type";
import { getEmptyItem, getEmptyPost } from "@/utils/commonUtils";
import AddUpdateButton from "@/components/admin/form/addUpdateButton";
import { createItem } from "@/app/actions/item-post/admin";
import RowListComponent from "@/components/admin/item/rowListComponent";

interface Props {
  items: ItemFull[] | PostFull[];
  categories?: Category[];
}
export default function ListComponent({ items, categories }: Props) {
  const isPost = items[0].type === Type.POST;
  return (
    <>
      <div className={`${s.listWrapper} area`}>
        {items &&
          items.map((item: PostFull) => {
            return (
              <RowListComponent
                key={item.id}
                item={item}
                categories={categories}
              />
            );
          })}
      </div>
      <AddUpdateButton
        item={isPost ? getEmptyPost() : getEmptyItem(items[0].type)}
        action={createItem}
        categories={categories}
      />
    </>
  );
}
