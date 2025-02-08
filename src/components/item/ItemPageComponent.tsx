"use client";

import { CategoryFull, ItemFull, Type } from "@/lib/type";
import React, { useEffect, useState } from "react";
import CategorySelectComponent from "@/components/item/categorySelectComponent";
import ItemComponent from "@/components/item/ItemComponent";
import s from "@/components/item/ItemComponent.module.css";
import { DEVICE } from "@/constants/image";
import useWindowSize from "@/components/hooks/useWindowSize";

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
  const window = useWindowSize();
  const isSmall = window.innerWidth < DEVICE.SMALL;
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
    return (
      <div className={s.noAside}>
        <div className={s.itemsContainer}>
          {itemsWhenNoCategory.map((item) => (
            <ItemComponent key={item.id} item={item} />
          ))}
        </div>
      </div>
    );
  else
    return (
      <div className={`${isSmall ? s.noAside : s.withAside}`}>
        {categories.length > 0 && (
          <>
            <div className={s.selectCategoryContainer}>
              <CategorySelectComponent
                type={type}
                categories={categories}
                onChange={setSelectedCategoryKey}
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
        {selectedItems.length > 0 && (
          <div
            className={`${type === Type.SCULPTURE ? s.sculptItemsContainer : s.itemsContainer}`}
          >
            {selectedItems.map((item) => (
              <ItemComponent key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    );
}
