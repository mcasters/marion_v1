import { Type } from "@/lib/type";
import ItemListComponent from "@/components/admin/item/itemListComponent";
import s from "@/components/admin/admin.module.css";
import React from "react";
import {
  getAllCategories,
  getAllItems,
  getYears,
} from "../../actions/item-post";
import ItemLayoutForm from "@/components/admin/item/itemLayoutForm";
import CategoryComponent from "@/components/admin/item/category/categoryComponent";

export default async function Dessins() {
  const categories = await getAllCategories(Type.DRAWING);
  const items = await getAllItems(Type.DRAWING);
  const years = await getYears(Type.DRAWING);

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
      <CategoryComponent
        type={Type.DRAWING}
        categories={categories}
        items={items}
      />
    </>
  );
}
