import { Type } from "@/lib/type";
import WorkComponent from "@/components/admin/item/workComponent";
import s from "@/components/admin/admin.module.css";
import React from "react";
import {
  getAllCategories,
  getAllItems,
  getYears,
} from "../../actions/item-post";

export default async function Dessins() {
  const categories = await getAllCategories(Type.DRAWING);
  const items = await getAllItems(Type.DRAWING);
  const years = await getYears(Type.DRAWING);

  return (
    <>
      <h1 className={s.title1}>Les dessins</h1>
      <WorkComponent
        categories={categories}
        years={years}
        items={items}
        type={Type.DRAWING}
      />
    </>
  );
}
