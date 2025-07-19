"use client";

import React, { useEffect, useState } from "react";
import s from "@/components/admin/admin.module.css";
import { Category, WorkFull } from "@/lib/type.ts";
import { getYearsFromItems } from "@/lib/utils/commonUtils.ts";

interface Props {
  items: WorkFull[];
  categories: Category[];
  onFilteredItems: (items: WorkFull[]) => void;
}
export default function FilterWorkListComponent({
  items,
  categories,
  onFilteredItems,
}: Props) {
  const years = getYearsFromItems(items);
  const [categoryFilter, setCategoryFilter] = useState<number>(-1);
  const [yearFilter, setYearFilter] = useState<number>(-1);
  const [isOutFilter, setIsOutFilter] = useState<number>(-1);

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

  const filterByIsOut = (_items: WorkFull[]): WorkFull[] => {
    if (isOutFilter === -1) return _items;
    else if (isOutFilter === 0) return _items.filter((i) => !i.isOut);
    else return _items.filter((i) => i.isOut);
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
    onFilteredItems(filterByYear(filterByCategory(filterByIsOut(items))));
  }, [yearFilter, categoryFilter, isOutFilter, items]);

  return (
    <div className={s.filterContainer}>
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
      <label className={s.filter}>
        Filtre par sortie
        <select
          name="isOut"
          value={isOutFilter}
          onChange={(e) => {
            setIsOutFilter(Number(e.target.value));
          }}
        >
          <option value={-1}>-- Pas de filtre --</option>
          <option value={0}>Non sortie</option>
          <option value={1}>Sortie</option>
        </select>
      </label>
    </div>
  );
}
