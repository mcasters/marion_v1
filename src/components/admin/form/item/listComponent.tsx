"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import s from "@/components/admin/adminList.module.css";
import { Category, Item, Type } from "@/lib/type";
import RowListComponent from "@/components/admin/form/item/rowListComponent";
import useKeyPress from "@/components/hooks/useKeyPress.ts";
import useOnClickOutside from "@/components/hooks/useOnClickOutside.ts";

interface Props {
  items: Item[];
  type: Type;
  categories?: Category[];
}

export default function ListComponent({ items, type, categories }: Props) {
  const refList = useRef(null);
  const isOutside = useOnClickOutside(refList);
  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    if (!isOutside && arrowUpPressed)
      setSelectedIndex((prevState) =>
        prevState !== 0 ? prevState - 1 : items.length - 1,
      );
  }, [arrowUpPressed]);

  useEffect(() => {
    if (!isOutside && arrowDownPressed)
      setSelectedIndex((prevState) =>
        prevState !== items.length - 1 ? prevState + 1 : 0,
      );
  }, [arrowDownPressed]);

  return (
    <div
      ref={refList}
      className={`${type === Type.CATEGORY ? s.categoryListWrapper : s.itemListWrapper} ${s.listWrapper} area`}
    >
      {items.map((item, i) => {
        return (
          <Fragment key={i}>
            <div
              onClick={() => setSelectedIndex(i)}
              role="button"
              style={{
                cursor: "pointer",
              }}
            >
              <RowListComponent
                item={item}
                isSelected={selectedIndex === i}
                isOutside={isOutside}
                categories={categories}
              />
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
