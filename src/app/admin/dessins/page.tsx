import { Type } from "@/lib/type";
import ItemListComponent from "@/components/admin/item/itemListComponent";
import s from "@/components/admin/admin.module.css";
import React from "react";
import { getMetaMap } from "@/utils/commonUtils";
import { getAllCategories, getAllItems, getYears } from "@/app/actions/items";
import ItemLayoutForm from "@/components/admin/item/itemLayoutForm";
import { getMetas } from "@/app/actions/meta";
import CategoryListComponent from "@/components/admin/item/category/categoryListComponent";

export default async function Dessins() {
  const categories = await getAllCategories(Type.DRAWING);
  const items = await getAllItems(Type.DRAWING);
  const years = await getYears(Type.DRAWING, true);
  const metas = getMetaMap(await getMetas());

  return (
    <>
      <h1 className={s.title1}>Les dessins</h1>
      <ItemLayoutForm type={Type.DRAWING} />
      <ItemListComponent
        categories={categories}
        years={years}
        items={items}
        type={Type.DRAWING}
      />
      <CategoryListComponent
        type={Type.DRAWING}
        categories={categories}
        items={items}
      />
    </>
  );
}
