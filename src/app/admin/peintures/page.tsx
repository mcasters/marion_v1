import ItemListComponent from "@/components/admin/item/ItemListComponent";
import s from "@/styles/admin/Admin.module.css";
import React from "react";
import { Type } from "@/lib/type";
import { getItemLayout, getMetaMap } from "@/utils/commonUtils";
import { getAllCategories, getAllItems, getYears } from "@/app/actions/items";
import ItemLayoutForm from "@/components/admin/item/ItemLayoutForm";
import { META } from "@/constants/specific";
import { getMetas } from "@/app/actions/meta";
import CategoryListComponent from "@/components/admin/item/category/CategoryListComponent";

export default async function Peintures() {
  const categories = await getAllCategories(Type.PAINTING);
  const years = await getYears(Type.PAINTING, true);
  const items = await getAllItems(Type.PAINTING);
  const metas = getMetaMap(await getMetas());

  return (
    <>
      <h1 className={s.title1}>Les peintures</h1>
      <ItemLayoutForm
        layout={getItemLayout(metas.get(META.PAINTING_LAYOUT))}
        type={Type.PAINTING}
      />
      <ItemListComponent
        categories={categories}
        years={years}
        items={items}
        type={Type.PAINTING}
      />
      <CategoryListComponent
        type={Type.PAINTING}
        categories={categories}
        items={items}
      />
    </>
  );
}
