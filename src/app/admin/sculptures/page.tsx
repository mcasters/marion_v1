import ItemListComponent from "@/components/admin/item/ItemListComponent";
import s from "@/components/admin/admin.module.css";
import React from "react";
import { Type } from "@/lib/type";
import { getMetaMap } from "@/utils/commonUtils";
import { getAllCategories, getAllItems, getYears } from "@/app/actions/items";
import ItemLayoutForm from "@/components/admin/item/ItemLayoutForm";
import { getMetas } from "@/app/actions/meta";
import CategoryListComponent from "@/components/admin/item/category/CategoryListComponent";

export default async function Sculptures() {
  const categories = await getAllCategories(Type.SCULPTURE);
  const years = await getYears(Type.SCULPTURE, true);
  const items = await getAllItems(Type.SCULPTURE);
  const metas = getMetaMap(await getMetas());

  return (
    <>
      <h1 className={s.title1}>Les sculptures</h1>
      <ItemLayoutForm type={Type.SCULPTURE} />
      <ItemListComponent
        categories={categories}
        years={years}
        items={items}
        type={Type.SCULPTURE}
      />
      <CategoryListComponent
        type={Type.SCULPTURE}
        categories={categories}
        items={items}
      />
    </>
  );
}
