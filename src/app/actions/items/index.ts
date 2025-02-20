"use server";

import { CategoryFull, ItemFull, Type } from "@/lib/type";
import {
  cache,
  KEYS,
  queryAllCategories,
  queryCategories,
  queryCategory,
  queryItemsByYear,
  queryNoCategory,
  queryYears,
} from "@/app/actions/items/queries";

export async function getYears(
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
  isAdmin: boolean,
): Promise<number[]> {
  const years = await cache(
    () => queryYears(type),
    isAdmin,
    `${KEYS[type].years}`,
  );

  return JSON.parse(JSON.stringify(years));
}

export async function getItemsByYear(
  year: string,
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
  isAdmin: boolean,
): Promise<ItemFull[]> {
  const items = await cache(
    () => queryItemsByYear(type, year),
    isAdmin,
    `${KEYS[type].itemsByYear}-${year}`,
  );

  return JSON.parse(JSON.stringify(items));
}

export async function getCategories(
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
  isAdmin: boolean,
): Promise<CategoryFull[]> {
  const categories = await cache(
    () => queryCategories(type),
    isAdmin,
    KEYS[type].categories,
  );

  const noCategory = await cache(
    () => queryNoCategory(type),
    isAdmin,
    KEYS[type].noCategory,
  );
  if (noCategory) categories.push(noCategory);

  return JSON.parse(JSON.stringify(categories));
}

export async function getCategoryByKey(
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
  isAdmin: boolean,
  categoryKey: string,
): Promise<CategoryFull> {
  let category;

  if (categoryKey === "no-category") {
    category = await cache(
      () => queryNoCategory(type),
      isAdmin,
      KEYS[type].noCategory,
    );
  } else {
    category = await cache(
      () => queryCategory(type, categoryKey),
      isAdmin,
      `${KEYS[type].category}-${categoryKey}`,
    );
  }

  return JSON.parse(JSON.stringify(category));
}

// Categories with also no Items inside
export async function getAllCategories(
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
): Promise<CategoryFull[]> {
  let res = await queryAllCategories(type);
  const noCategory = await queryNoCategory(type);

  if (noCategory) res.push(noCategory);

  return JSON.parse(JSON.stringify(res));
}
