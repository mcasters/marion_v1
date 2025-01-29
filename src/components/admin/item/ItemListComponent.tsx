"use client";

import RowItemListComponent from "./RowItemListComponent";
import React, { useEffect, useMemo, useState } from "react";
import s from "@/styles/admin/AdminList.module.css";
import style from "@/styles/admin/Admin.module.css";
import { CategoryFull, ItemFull } from "@/lib/model";

interface Props {
  items: ItemFull[];
  categories: CategoryFull[];
  years: number[];
}
export default function ItemListComponent({ items, categories, years }: Props) {
  const title = `Liste des ${items[0]?.type ? items[0].type : "item"}s`;
  const [categoryFilter, setCategoryFilter] = useState<number>(-1);
  const [yearFilter, setYearFilter] = useState<number>(-1);
  const [filteredItems, setFilteredItems] = useState<ItemFull[]>(items);
  const categoryFilterMemo = useMemo(() => {
    return categoryFilter;
  }, [categoryFilter]);
  const yearFilterMemo = useMemo(() => {
    return yearFilter;
  }, [yearFilter]);

  const filterByCategory = (_items: ItemFull[]): ItemFull[] => {
    if (categoryFilterMemo === -1) return _items;
    else if (categoryFilterMemo === 0) return _items.filter((i) => !i.category);
    else return _items.filter((i) => i.category?.id === categoryFilterMemo);
  };

  const filterByYear = (_items: ItemFull[]): ItemFull[] => {
    if (yearFilterMemo === -1) return _items;
    else
      return _items.filter(
        (i) => new Date(i.date).getFullYear() === yearFilterMemo,
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
    <div className={s.listContainer}>
      <h2>{title}</h2>
      <h4>( total : {items.length} )</h4>
      <label className={s.filter}>
        Filtre par catégorie
        <select
          name="categoryId"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(Number(e.target.value))}
          className={style.select}
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
          className={style.select}
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
      <div className={s.list}>
        {filteredItems &&
          filteredItems.map((item: ItemFull) => {
            return (
              <RowItemListComponent
                key={item.id}
                item={item}
                categories={categories}
              />
            );
          })}
      </div>
    </div>
  );
}
