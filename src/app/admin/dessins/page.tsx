import { Type } from "@/lib/type";
import ItemListComponent from "@/components/admin/item/ItemListComponent";
import CategoryComponent from "@/components/admin/item/category/CategoryComponent";
import s from "@/styles/admin/Admin.module.css";
import React from "react";
import ItemForm from "@/components/admin/form/ItemForm";
import { getEmptyItem, getItemLayout, getMetaMap } from "@/utils/commonUtils";
import { getAllCategories, getAllItems, getYears } from "@/app/actions/items";
import { createItem } from "@/app/actions/items/admin";
import { META } from "@/constants/specific";
import ItemLayoutForm from "@/components/admin/item/ItemLayoutForm";
import { getMetas } from "@/app/actions/meta";

export default async function Dessins() {
  const categories = await getAllCategories(Type.DRAWING);
  const items = await getAllItems(Type.DRAWING);
  const years = await getYears(Type.DRAWING, true);
  const metas = getMetaMap(await getMetas());

  return (
    <>
      <h1 className={s.title1}>Les dessins</h1>
      <ItemLayoutForm layout={getItemLayout(metas.get(META.DRAWING_LAYOUT))} />
      <ItemListComponent categories={categories} years={years} items={items} />
      <ItemForm
        categories={categories}
        item={getEmptyItem(Type.DRAWING)}
        itemAction={createItem}
      />
      <CategoryComponent
        type={Type.DRAWING}
        categories={categories}
        items={items}
      />
    </>
  );
}
