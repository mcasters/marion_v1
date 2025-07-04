"use client";

import React, { useEffect, useState } from "react";
import s from "@/components/admin/adminList.module.css";
import { Category, Item, Type } from "@/lib/type";
import RowListComponent from "@/components/admin/form/item/rowListComponent";
import { useTheme } from "@/app/context/themeProvider.tsx";
import useKeyPress from "@/components/hooks/useKeyPress.ts";

interface Props {
  items: Item[];
  type: Type;
  categories?: Category[];
}

export default function ListComponent({ items, type, categories }: Props) {
  const theme = useTheme();
  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const isCategory = type === Type.CATEGORY;

  useEffect(() => {
    if (arrowUpPressed)
      setSelectedIndex((prevState) =>
        prevState !== 0 ? prevState - 1 : items.length - 1,
      );
  }, [arrowUpPressed]);

  useEffect(() => {
    if (arrowDownPressed)
      setSelectedIndex((prevState) =>
        prevState !== items.length - 1 ? prevState + 1 : 0,
      );
  }, [arrowDownPressed]);

  return (
    <div
      className={`${isCategory ? s.categoryListWrapper : s.itemListWrapper} ${s.listWrapper} area`}
    >
      {items.map((item, i) => {
        return (
          <div
            key={i}
            onClick={() => setSelectedIndex(i)}
            role="button"
            style={{
              cursor: "pointer",
            }}
            className={i === selectedIndex ? "selected" : undefined}
          >
            <RowListComponent item={item} categories={categories} />
          </div>
        );
      })}
    </div>
  );
}
