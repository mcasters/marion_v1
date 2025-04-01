"use server";

import { Category, ItemFull, Type } from "@/lib/type";
import {
  KEYS,
  queryAllCategories,
  queryAllItems,
  queryCategories,
  queryCategory,
  queryItemsByCategory,
  queryItemsByYear,
  queryNoCategory,
  queryYears,
} from "@/app/actions/items/queries";
import { getNoCategory } from "@/utils/commonUtils";
import { cacheDBDatas } from "@/app/actions/actionUtils";

export async function getYears(
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
): Promise<number[]> {
  const years = await cacheDBDatas(
    () => queryYears(type),
    `${KEYS[type].years}`,
  );

  return JSON.parse(JSON.stringify(years));
}

export async function getCategories(
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
): Promise<Category[]> {
  const categories = await cacheDBDatas(
    () => queryCategories(type),
    KEYS[type].categories,
  );

  const noCategory = await cacheDBDatas(
    () => queryNoCategory(type),
    KEYS[type].noCategory,
  );
  if (noCategory) categories.push(noCategory);

  return JSON.parse(JSON.stringify(categories));
}

export async function getItemsByYear(
  year: string,
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
): Promise<ItemFull[]> {
  const items = await cacheDBDatas(
    () => queryItemsByYear(type, year),
    `${KEYS[type].itemsByYear}-${year}`,
  );

  return JSON.parse(JSON.stringify(items));
}

export async function getCategory(
  categoryKey: string,
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
): Promise<Category | null> {
  let category;

  if (categoryKey === "no-category") {
    category = getNoCategory();
  } else {
    category = await cacheDBDatas(
      () => queryCategory(type, categoryKey),
      `${KEYS[type].category}-${categoryKey}`,
    );
  }
  return JSON.parse(JSON.stringify(category));
}

export async function getItemsByCategory(
  categoryKey: string,
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
): Promise<ItemFull[]> {
  const items = await cacheDBDatas(
    () => queryItemsByCategory(type, categoryKey),
    `${KEYS[type].itemsByCategory}-${categoryKey}`,
  );

  return JSON.parse(JSON.stringify(items));
}

// FOR ADMIN : Categories with also no Items inside
export async function getAllCategories(
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
): Promise<Category[]> {
  const res = await queryAllCategories(type);
  const noCategory = await queryNoCategory(type);

  if (noCategory) res.push(noCategory);

  return JSON.parse(JSON.stringify(res));
}

// FOR ADMIN
export async function getAllItems(
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
): Promise<ItemFull[]> {
  const items = await queryAllItems(type);

  return JSON.parse(JSON.stringify(items));
}
