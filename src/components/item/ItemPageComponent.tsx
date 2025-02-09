"use client";

import { CategoryFull, ItemFull, Type } from "@/lib/type";
import React, { useMemo, useState } from "react";
import SelectComponent from "@/components/item/selectComponent";
import ItemComponent from "@/components/item/ItemComponent";
import s from "@/components/item/ItemComponent.module.css";
import { DEVICE } from "@/constants/image";
import useWindowSize from "@/components/hooks/useWindowSize";
import { getItemsFromCategories } from "@/utils/commonUtils";

interface Props {
  type: Type;
  categories: CategoryFull[];
  itemsWhenNoCategory: ItemFull[];
  years: number[];
}
export default function ItemPageComponent({
  categories,
  type,
  itemsWhenNoCategory,
  years,
}: Props) {
  const window = useWindowSize();
  const isSmall = window.innerWidth < DEVICE.SMALL;
  const noCategory = categories.length === 0;
  const [title, setTitle] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryFull | undefined
  >(undefined);
  const allItems = useMemo(() => {
    return categories.length > 0
      ? getItemsFromCategories(categories)
      : itemsWhenNoCategory;
  }, [categories]);

  const [selectedItems, setSelectedItems] = useState<ItemFull[]>(allItems);

  const onCategoryKeyChange = (key: string) => {
    if (key === "") {
      setSelectedCategory(null);
      setTitle("Toutes les catégories");
      setSelectedItems(allItems);
    } else {
      const category = categories.find((category) => category.key === key);
      if (category) {
        setSelectedCategory(category);
        setTitle(category.value);
        setSelectedItems(category.items);
      }
    }
  };

  const onYearChange = (year: number) => {
    if (year === 0) {
      setTitle("Toutes les catégories");
      setSelectedItems(allItems);
      setSelectedCategory(null);
    } else {
      const items = allItems.filter(
        (item) => new Date(item.date).getFullYear() === year,
      );
      setTitle(year.toString());
      setSelectedItems(items);
      setSelectedCategory(null);
    }
  };

  return (
    <div
      className={`${noCategory ? s.noAside : isSmall ? s.noAside : s.withAside}`}
    >
      {!noCategory && (
        <>
          <div className={s.selectCategoryContainer}>
            <SelectComponent
              type={type}
              categories={categories}
              onCategoryChange={onCategoryKeyChange}
              years={years}
              onYearChange={onYearChange}
              isSmall={isSmall}
            />
          </div>
          <div className={s.descriptionCategoryContainer}>
            {title && <h2 className={`${s.categoryValue}`}>{title}</h2>}
            {selectedCategory && (
              <>
                <p className={s.categoryTitle}>
                  {selectedCategory.content.title}
                </p>
                <p>{selectedCategory.content.text}</p>
              </>
            )}
          </div>
        </>
      )}
      <div
        className={`${type === Type.SCULPTURE ? s.sculptureContainer : s.itemsContainer}`}
      >
        {selectedItems.map((item) => (
          <ItemComponent key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
