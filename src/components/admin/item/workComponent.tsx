"use client";

import React, { useEffect, useState } from "react";
import s from "@/components/admin/adminList.module.css";
import style from "@/components/admin/admin.module.css";
import { Category, Type, workFull } from "@/lib/type";
import { getEmptyItem } from "@/utils/commonUtils";
import { createItem } from "@/app/actions/item-post/admin";
import AddUpdateButton from "@/components/admin/form/addUpdateButton";
import ListComponent from "@/components/admin/form/item/listComponent";

interface Props {
  categories: Category[];
  years: number[];
  items: workFull[];
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING;
}
export default function WorkComponent({
  categories,
  years,
  items,
  type,
}: Props) {
  const title = `Gestion des ${type}s`;

  const [categoryFilter, setCategoryFilter] = useState<number>(-1);
  const [yearFilter, setYearFilter] = useState<number>(-1);
  const [filteredItems, setFilteredItems] = useState<workFull[]>(items);

  const filterByCategory = (_items: workFull[]): workFull[] => {
    if (categoryFilter === -1) return _items;
    else if (categoryFilter === 0) return _items.filter((i) => !i.categoryId);
    else return _items.filter((i) => i.categoryId === categoryFilter);
  };

  const filterByYear = (_items: workFull[]): workFull[] => {
    if (yearFilter === -1) return _items;
    else
      return _items.filter(
        (i) => new Date(i.date).getFullYear() === yearFilter,
      );
  };

  useEffect(() => {
    if (!years.includes(yearFilter)) setYearFilter(-1);
  }, [years]);

  useEffect(() => {
    function hasCategory() {
      const tab = categories.find((category) => category.id === categoryFilter);
      return !!tab;
    }
    if (!hasCategory()) setCategoryFilter(-1);
  }, [categories]);

  useEffect(() => {
    setFilteredItems(filterByYear(filterByCategory(items)));
  }, [yearFilter, categoryFilter, items]);

  return (
    <div className={style.container}>
      <h2 className={style.title2}>{`${title} ( total : ${items.length} )`}</h2>
      <label className={s.filter}>
        Filtre par catégorie
        <select
          name="categoryId"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(Number(e.target.value))}
        >
          <option value={-1}>-- Pas de filtre --</option>
          {categories &&
            categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.value}
              </option>
            ))}
        </select>
      </label>
      <label className={s.filter}>
        Filtre par année
        <select
          name="year"
          value={yearFilter}
          onChange={(e) => {
            setYearFilter(Number(e.target.value));
          }}
        >
          <option value={-1}>-- Pas de filtre --</option>
          {years &&
            years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
        </select>
      </label>
      <h4>{`Filtre : ${filteredItems.length} ${type}s`}</h4>
      <ListComponent items={items} categories={categories} />
      <AddUpdateButton
        item={getEmptyItem(items[0].type)}
        action={createItem}
        categories={categories}
      />
    </div>
  );
}
