import s from "@/components/admin/admin.module.css";
import React from "react";
import { Type } from "@/lib/type";
import { getAllCategories, getAllItems } from "@/app/actions/item-post";
import ItemLayoutForm from "@/components/admin/form/item/itemLayoutForm.tsx";
import WorkListComponent from "@/components/admin/item/workListComponent.tsx";
import AddButton from "@/components/admin/form/addButton.tsx";
import { getEmptyItem } from "@/utils/commonUtils.ts";
import CategoryComponent from "@/components/admin/item/categoryComponent.tsx";

export default async function Peintures() {
  const type = Type.PAINTING;
  const categories = await getAllCategories(type);
  const items = await getAllItems(type);

  return (
    <div className={s.container}>
      <h1 className={s.title1}>Les peintures</h1>
      <h2 className={s.title2}>Mise en page</h2>
      <ItemLayoutForm type={type} />
      <div className="separate" />
      <h2
        className={s.title2}
      >{`Gestion des peintures ( total : ${items.length} )`}</h2>
      <WorkListComponent items={items} categories={categories} type={type} />
      <AddButton item={getEmptyItem(type)} categories={categories} />
      <div className="separate" />
      <h2 className={s.title2}>Gestion des catégories</h2>
      <CategoryComponent type={type} categories={categories} items={items} />
    </div>
  );
}
