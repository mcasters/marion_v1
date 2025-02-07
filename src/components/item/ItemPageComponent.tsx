"use client";

import { CategoryFull, ItemFull, Type } from "@/lib/type";
import React, { useEffect, useState } from "react";
import CategorySelectComponent from "@/components/item/categorySelectComponent";
import ItemComponent from "@/components/item/ItemComponent";
import s from "@/components/item/ItemComponent.module.css";

interface Props {
  type: Type;
  categories: CategoryFull[];
  itemsWhenNoCategory: ItemFull[];
}
export default function ItemPageComponent({
  categories,
  type,
  itemsWhenNoCategory,
}: Props) {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryFull | undefined
  >(undefined);
  const [title, setTitle] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<ItemFull[]>([]);

  useEffect(() => {
    if (selectedCategoryKey === "") {
      let items: ItemFull[] = [];
      categories.forEach((category) => {
        items = items.concat(category.items);
      });
      setTitle("Toutes les catégories");
      setSelectedItems(items);
    } else {
      const cat = categories.find(
        (category) => category.key === selectedCategoryKey,
      );
      if (cat) {
        setSelectedCategory(cat);
        setTitle(cat.value);
        setSelectedItems(cat?.items || []);
      }
    }
  }, [selectedCategoryKey]);

  if (itemsWhenNoCategory.length > 0)
    return itemsWhenNoCategory.map((item) => (
      <ItemComponent key={item.id} item={item} />
    ));
  else
    return (
      <>
        {categories.length > 0 && (
          <>
            <div className={s.selectCategoryContainer}>
              <CategorySelectComponent
                type={type}
                categories={categories}
                onChange={setSelectedCategoryKey}
              />
            </div>
            <div className={s.contentCategoryContainer}>
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
        {selectedItems.length > 0 &&
          selectedItems.map((item) => (
            <ItemComponent key={item.id} item={item} />
          ))}
      </>
    );
}
