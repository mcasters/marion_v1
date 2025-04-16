import WorkComponent from "@/components/admin/item/workComponent";
import s from "@/components/admin/admin.module.css";
import React from "react";
import { Type } from "@/lib/type";
import {
  getAllCategories,
  getAllItems,
  getYears,
} from "@/app/actions/item-post";
import ItemLayoutForm from "@/components/admin/item/itemLayoutForm";
import CategoryComponent from "@/components/admin/item/categoryComponent";

export default async function Peintures() {
  const categories = await getAllCategories(Type.PAINTING);
  const years = await getYears(Type.PAINTING);
  const items = await getAllItems(Type.PAINTING);

  return (
    <>
      <h1 className={s.title1}>Les peintures</h1>
      <ItemLayoutForm type={Type.PAINTING} />
      <WorkComponent
        categories={categories}
        years={years}
        items={items}
        type={Type.PAINTING}
      />
      <CategoryComponent
        type={Type.PAINTING}
        categories={categories}
        items={items}
      />
    </>
  );
}
