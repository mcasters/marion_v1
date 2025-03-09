import ItemListComponent from "@/components/admin/item/ItemListComponent";
import CategoryComponent from "@/components/admin/item/category/CategoryComponent";
import s from "@/styles/admin/Admin.module.css";
import React from "react";
import { Type } from "@/lib/type";
import { getEmptyItem, getItemLayout, getMetaMap } from "@/utils/commonUtils";
import ItemForm from "@/components/admin/form/ItemForm";
import { getAllCategories, getAllItems, getYears } from "@/app/actions/items";
import { createItem } from "@/app/actions/items/admin";
import ItemLayoutForm from "@/components/admin/item/ItemLayoutForm";
import { META } from "@/constants/specific";
import { getMetas } from "@/app/actions/meta";

export default async function Peintures() {
  const categories = await getAllCategories(Type.PAINTING);
  const years = await getYears(Type.PAINTING, true);
  const items = await getAllItems(Type.PAINTING);
  const metas = getMetaMap(await getMetas());

  return (
    <>
      <h1 className={s.title1}>Les peintures</h1>
      <ItemLayoutForm layout={getItemLayout(metas.get(META.PAINTING_LAYOUT))} />
      <ItemListComponent categories={categories} years={years} items={items} />
      <ItemForm
        categories={categories}
        item={getEmptyItem(Type.PAINTING)}
        itemAction={createItem}
      />
      <CategoryComponent
        type={Type.PAINTING}
        categories={categories}
        items={items}
      />
    </>
  );
}
