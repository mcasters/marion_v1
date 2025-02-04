"use client";

import { CategoryFull } from "@/lib/type";
import Link from "next/link";
import React from "react";
import { MENU_1_ITEMS } from "@/constants/specific/routes";

interface Props {
  tag: string;
  categories: CategoryFull[];
}
export default function ItemPageComponent({ categories, tag }: Props) {
  const item = MENU_1_ITEMS[tag];

  return (
    <ul>
      {categories.map((category) => {
        return (
          <li key={category.key}>
            <Link href={`/${item.BASE_PATH}/${category.key}`}>
              {category.value}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
