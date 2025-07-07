import WorkComponent from "@/components/admin/item/workComponent";
import s from "@/components/admin/admin.module.css";
import React from "react";
import { Type } from "@/lib/type";
import { getAllCategories, getAllItems } from "../../actions/item-post";

export default async function Sculptures() {
  const categories = await getAllCategories(Type.SCULPTURE);
  const items = await getAllItems(Type.SCULPTURE);

  return (
    <>
      <h1 className={s.title1}>Les sculptures</h1>
      <WorkComponent
        categories={categories}
        items={items}
        type={Type.SCULPTURE}
      />
    </>
  );
}
