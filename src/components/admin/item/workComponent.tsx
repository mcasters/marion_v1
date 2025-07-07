"use client";

import React from "react";
import { Category, Type, WorkFull } from "@/lib/type";
import { getEmptyItem } from "@/utils/commonUtils";
import AddUpdateButton from "@/components/admin/form/addUpdateButton";
import WorkListComponent from "@/components/admin/item/workListComponent.tsx";
import CategoryComponent from "@/components/admin/item/categoryComponent.tsx";
import ItemLayoutForm from "@/components/admin/form/item/itemLayoutForm.tsx";

interface Props {
  categories: Category[];
  items: WorkFull[];
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING;
}
export default function WorkComponent({ categories, items, type }: Props) {
  return (
    <>
      <ItemLayoutForm type={type} />
      <div className="separate" />
      <WorkListComponent items={items} categories={categories} type={type} />
      <AddUpdateButton item={getEmptyItem(type)} categories={categories} />
      <div className="separate" />
      <CategoryComponent type={type} categories={categories} items={items} />
    </>
  );
}
