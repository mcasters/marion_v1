import WorkListComponent from "@/components/admin/item/workListComponent";
import s from "@/components/admin/admin.module.css";
import React from "react";
import { Type } from "@/lib/type";
import {
  getAllCategories,
  getAllItems,
  getYears,
} from "../../actions/item-post";
import ItemLayoutForm from "@/components/admin/item/itemLayoutForm";
import CategoryComponent from "@/components/admin/item/category/categoryComponent";

export default async function Sculptures() {
  const categories = await getAllCategories(Type.SCULPTURE);
  const years = await getYears(Type.SCULPTURE);
  const items = await getAllItems(Type.SCULPTURE);

  return (
    <>
      <h1 className={s.title1}>Les sculptures</h1>
      <ItemLayoutForm type={Type.SCULPTURE} />
      <WorkListComponent
        categories={categories}
        years={years}
        items={items}
        type={Type.SCULPTURE}
      />
      <CategoryComponent
        type={Type.SCULPTURE}
        categories={categories}
        items={items}
      />
    </>
  );
}
