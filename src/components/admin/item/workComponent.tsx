"use client";

import React, { useEffect, useState } from "react";
import s from "@/components/admin/admin.module.css";
import { Category, Type, WorkFull } from "@/lib/type";
import { getEmptyItem } from "@/utils/commonUtils";
import AddUpdateButton from "@/components/admin/form/addUpdateButton";
import ListComponent from "@/components/admin/form/item/listComponent";

interface Props {
  categories: Category[];
  years: number[];
  items: WorkFull[];
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
  const [filteredItems, setFilteredItems] = useState<WorkFull[]>(items);

  const filterByCategory = (_items: WorkFull[]): WorkFull[] => {
    if (categoryFilter === -1) return _items;
    else if (categoryFilter === 0) return _items.filter((i) => !i.categoryId);
    else return _items.filter((i) => i.categoryId === categoryFilter);
  };

  const filterByYear = (_items: WorkFull[]): WorkFull[] => {
    if (yearFilter === -1) return _items;
    else
      return _items.filter(
        (i) => new Date(i.date).getFullYear() === yearFilter,
      );
  };

  useEffect(() => {
    const yearFilterDeleted = !years.includes(yearFilter);
    if (yearFilterDeleted) setYearFilter(-1);
  }, [years]);

  useEffect(() => {
    const categoryFilterDeleted = !categories.find(
      (category) => category.id === categoryFilter,
    );
    if (categoryFilterDeleted) setCategoryFilter(-1);
  }, [categories]);

  useEffect(() => {
    setFilteredItems(filterByYear(filterByCategory(items)));
  }, [yearFilter, categoryFilter, items]);

  return (
    <div className={s.container}>
      <h2 className={s.title2}>{`${title} ( total : ${items.length} )`}</h2>
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
      <br />
      <br />
      <h4>{`Filtre : ${filteredItems.length} ${type}s`}</h4>
      <ListComponent
        items={filteredItems}
        categories={categories}
        type={type}
      />
      <AddUpdateButton item={getEmptyItem(type)} categories={categories} />
    </div>
  );
}
