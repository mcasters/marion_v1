import ItemListComponent from "@/components/admin/item/ItemListComponent";
import s from "@/styles/admin/Admin.module.css";
import React from "react";
import { Type } from "@/lib/type";
import { getItemLayout, getMetaMap } from "@/utils/commonUtils";
import { getAllCategories, getAllItems, getYears } from "@/app/actions/items";
import { META } from "@/constants/specific";
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
      <ItemLayoutForm
        layout={getItemLayout(metas.get(META.SCULPTURE_LAYOUT))}
        type={Type.SCULPTURE}
      />
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
