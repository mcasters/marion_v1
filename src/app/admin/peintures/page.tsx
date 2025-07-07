import WorkComponent from "@/components/admin/item/workComponent";
import s from "@/components/admin/admin.module.css";
import React from "react";
import { Type } from "@/lib/type";
import {
  getAllCategories,
  getAllItems,
  getYears,
} from "@/app/actions/item-post";

export default async function Peintures() {
  const categories = await getAllCategories(Type.PAINTING);
  const years = await getYears(Type.PAINTING);
  const items = await getAllItems(Type.PAINTING);

  return (
    <>
      <h1 className={s.title1}>Les peintures</h1>
      <WorkComponent
        categories={categories}
        years={years}
        items={items}
        type={Type.PAINTING}
      />
    </>
  );
}
