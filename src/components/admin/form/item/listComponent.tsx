"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import s from "@/components/admin/adminList.module.css";
import { Category, Item, Type } from "@/lib/type";
import RowListComponent from "@/components/admin/form/item/rowListComponent";
import useKeyPress from "@/components/hooks/useKeyPress.ts";
import useOnClickOutside from "@/components/hooks/useOnClickOutside.ts";
import FilterWorkListComponent from "@/components/admin/form/item/filterWorkListComponent.tsx";

interface Props {
  items: Item[];
  type: Type;
  categories?: Category[];
}

export default function ListComponent({ items, type, categories }: Props) {
  const refList = useRef(null);
  const mouseOutside = useOnClickOutside(refList);
  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [itemsToDisplay, setItemsToDisplay] = useState<Item[]>(items);

  useEffect(() => {
    if (!mouseOutside && arrowUpPressed)
      setSelectedIndex((prevState) =>
        prevState !== 0 ? prevState - 1 : items.length - 1,
      );
  }, [arrowUpPressed]);

  useEffect(() => {
    if (!mouseOutside && arrowDownPressed)
      setSelectedIndex((prevState) =>
        prevState !== items.length - 1 ? prevState + 1 : 0,
      );
  }, [arrowDownPressed]);

  useEffect(() => {
    if (!categories) setItemsToDisplay(items);
  }, [items]);

  return (
    <>
      {!!categories && (
        <>
          <FilterWorkListComponent
            categories={categories}
            items={items}
            onFilteredItems={setItemsToDisplay}
          />
          <br />
          <h4>{`Filtre : ${itemsToDisplay.length} ${type}s`}</h4>
        </>
      )}
      <div
        ref={refList}
        className={`${type === Type.CATEGORY ? s.categoryListWrapper : s.itemListWrapper} ${s.listWrapper} area`}
      >
        {itemsToDisplay.map((item, i) => {
          const isNoCategory =
            type === Type.CATEGORY && item.key === "no-category";
          return (
            <Fragment key={i}>
              <div
                onClick={isNoCategory ? undefined : () => setSelectedIndex(i)}
                role={isNoCategory ? undefined : "button"}
                style={
                  isNoCategory
                    ? undefined
                    : {
                        cursor: "pointer",
                      }
                }
              >
                <RowListComponent
                  item={item}
                  isSelected={selectedIndex === i}
                  mouseOutside={mouseOutside}
                  categories={categories}
                  noDoubleClick={isNoCategory}
                />
              </div>
            </Fragment>
          );
        })}
      </div>
    </>
  );
}
