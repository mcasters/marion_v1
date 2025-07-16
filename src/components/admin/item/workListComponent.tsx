"use client";

import React, { useState } from "react";
import { Category, Type, WorkFull } from "@/lib/type";
import ListComponent from "@/components/admin/form/item/listComponent";
import FilterWorkListComponent from "@/components/admin/item/filterWorkListComponent.tsx";

interface Props {
  categories: Category[];
  items: WorkFull[];
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING;
}
export default function WorkListComponent({ categories, items, type }: Props) {
  const [filteredItems, setFilteredItems] = useState<WorkFull[]>(items);
  return (
    <>
      <FilterWorkListComponent
        categories={categories}
        items={items}
        type={type}
        onFilteredItems={setFilteredItems}
      />
      <br />
      <h4>{`Filtre : ${filteredItems.length} ${type}s`}</h4>
      <ListComponent
        items={filteredItems}
        categories={categories}
        type={type}
      />
    </>
  );
}
