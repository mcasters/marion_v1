"use client";

import React from "react";
import s from "@/components/admin/adminList.module.css";
import { Category, Item, Type } from "@/lib/type";
import AddUpdateButton from "@/components/admin/form/addUpdateButton";
import DeleteButton from "@/components/admin/form/deleteButton";
import RowListComponent from "@/components/admin/form/item/rowListComponent";
import { deleteCategory } from "@/app/actions/item-post/categories/admin";
import { deleteItem } from "@/app/actions/item-post/admin";
import { getMainImage } from "@/utils/commonUtils";

interface Props {
  items: Item[];
  type: Type;
  categories?: Category[];
}
export default function ListComponent({ items, type, categories }: Props) {
  const isCategory = type === Type.CATEGORY;
  const isPost = type === Type.POST;
  const isWork = !isCategory || !isPost;

  return (
    <div className={`${s.categoryListWrapper} area`}>
      {items.map((item) => {
        if (isCategory) {
          const isNoCategory = item.key === "no-category";
          return (
            <RowListComponent
              key={item.id}
              raw1={item.value}
              raw2={`${item.count} ${item.workType}(s)`}
              imageSrc={
                item.content.image.filename !== ""
                  ? `/images/${item.workType}/sm/${item.content.image.filename}`
                  : ""
              }
              AddUpdateButton={
                <AddUpdateButton item={item} disabled={isNoCategory} />
              }
              DeleteButton={
                <DeleteButton
                  action={() => deleteCategory(item.id, item.workType)}
                  disabled={item.count > 0 || isNoCategory}
                />
              }
            />
          );
        } else if (isWork) {
          const itemCategory = categories
            ? categories.find((category) => category.id === item.categoryId)
            : undefined;
          return (
            <RowListComponent
              key={item.id}
              raw1={item.title}
              raw2={itemCategory ? itemCategory.value : " "}
              raw3={new Date(item.date).getFullYear().toString()}
              imageSrc={
                item.images[0]?.filename
                  ? `/images/${type}/${item.images[0].filename}`
                  : ""
              }
              AddUpdateButton={
                <AddUpdateButton item={item} categories={categories} />
              }
              DeleteButton={
                <DeleteButton action={() => deleteItem(item.id, item.type)} />
              }
            />
          );
        } else if (isPost) {
          const mainImage = getMainImage(item);
          const src = mainImage
            ? `/images/post/${mainImage.filename}`
            : item.images[0]?.filename
              ? `/images/post/${item.images[0].filename}`
              : "";

          return (
            <RowListComponent
              key={item.id}
              raw1={item.title}
              raw2={new Date(item.date).getFullYear().toString()}
              imageSrc={src}
              AddUpdateButton={<AddUpdateButton item={item} />}
              DeleteButton={
                <DeleteButton action={() => deleteItem(item.id, item.type)} />
              }
            />
          );
        }
      })}
    </div>
  );
}
