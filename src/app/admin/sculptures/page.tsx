import ItemListComponent from "@/components/admin/item/itemListComponent";
import s from "@/components/admin/admin.module.css";
import React from "react";
import { Type } from "@/lib/type";
import { getAllCategories, getAllItems, getYears } from "@/app/actions/items";
import ItemLayoutForm from "@/components/admin/item/itemLayoutForm";
import CategoryListComponent from "@/components/admin/item/category/categoryListComponent";

export default async function Sculptures() {
  const categories = await getAllCategories(Type.SCULPTURE);
  const years = await getYears(Type.SCULPTURE, true);
  const items = await getAllItems(Type.SCULPTURE);

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
