"use client";

import RowItemListComponent from "./RowItemListComponent";
import React, { useEffect, useState } from "react";
import s from "@/styles/admin/AdminList.module.css";
import style from "@/styles/admin/Admin.module.css";
import { Category, ItemFull, Type } from "@/lib/type";
import { getEmptyItem } from "@/utils/commonUtils";
import AddItemButton from "@/components/admin/form/AddItemButton";

interface Props {
  categories: Category[];
  years: number[];
  items: ItemFull[];
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING;
}
export default function ItemListComponent({
  categories,
  years,
  items,
  type,
}: Props) {
  const title = `Gestion des ${type}s`;

  const [categoryFilter, setCategoryFilter] = useState<number>(-1);
  const [yearFilter, setYearFilter] = useState<number>(-1);
  const [filteredItems, setFilteredItems] = useState<ItemFull[]>(items);

  const filterByCategory = (_items: ItemFull[]): ItemFull[] => {
    if (categoryFilter === -1) return _items;
    else if (categoryFilter === 0) return _items.filter((i) => !i.categoryId);
    else return _items.filter((i) => i.categoryId === categoryFilter);
  };

  const filterByYear = (_items: ItemFull[]): ItemFull[] => {
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
      <div className={`${s.listWrapper} area`}>
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
      <AddItemButton item={getEmptyItem(type)} categories={categories} />
    </div>
  );
}
