import { unstable_cache } from "next/cache";
import { CategoryFull, ItemFull, Type } from "@/lib/type";
import prisma from "@/lib/prisma";
import { getEmptyContent } from "@/utils/commonUtils";

export async function cache<S>(
  fn: () => Promise<S>,
  isToCache: boolean,
  key: string,
): Promise<S> {
  const query = isToCache
    ? unstable_cache(async () => fn(), [key], {
        revalidate: 3600,
        tags: [key],
      })
    : fn;
  return query();
}

export const KEYS = {
  [Type.PAINTING]: {
    items: "paintings",
    itemsByYear: "paintingsByYear",
    noCategory: "paintingsWithNoCategory",
    categories: "paintingCategories",
    category: "paintingCategory",
    years: "paintingYears",
  },
  [Type.SCULPTURE]: {
    items: "sculptures",
    itemsByYear: "sculpturesByYear",
    noCategory: "sculpturesWithNoCategory",
    categories: "sculptureCategories",
    category: "sculptureCategory",
    years: "sculptureYears",
  },
  [Type.DRAWING]: {
    items: "drawings",
    itemsByYear: "drawingsByYear",
    noCategory: "drawingsWithNoCategory",
    categories: "drawingCategories",
    category: "drawingCategory",
    years: "drawingYears",
  },
};

export const queryYears = async (
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
): Promise<number[]> => {
  let res;

  if (type === Type.PAINTING)
    res = await prisma.painting.findMany({
      distinct: ["date"],
      select: {
        date: true,
      },
      orderBy: { date: "asc" },
    });
  else if (type === Type.SCULPTURE)
    res = await prisma.sculpture.findMany({
      distinct: ["date"],
      select: {
        date: true,
      },
      orderBy: { date: "asc" },
    });
  else
    res = await prisma.drawing.findMany({
      distinct: ["date"],
      select: {
        date: true,
      },
      orderBy: { date: "asc" },
    });

  const years: number[] = [];
  res.forEach((item) => {
    const date = new Date(item.date);
    years.push(date.getFullYear());
  });

  return [...new Set(years)];
};

export const queryItemsByYear = async (
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
  year: string,
): Promise<ItemFull[]> => {
  if (type === Type.PAINTING)
    return await prisma.painting.findMany({
      where: {
        date: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
      orderBy: { date: "asc" },
    });
  else if (type === Type.SCULPTURE)
    return await prisma.sculpture.findMany({
      where: {
        date: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
      include: { images: true },
      orderBy: { date: "asc" },
    });
  else
    return await prisma.drawing.findMany({
      where: {
        date: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
      orderBy: { date: "asc" },
    });
};

export const queryNoCategory = async (
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
): Promise<CategoryFull | null> => {
  let items;
  if (type === Type.PAINTING)
    items = await prisma.painting.findMany({
      where: {
        category: null,
      },
      orderBy: { date: "asc" },
    });
  else if (type === Type.SCULPTURE)
    items = await prisma.sculpture.findMany({
      where: {
        category: null,
      },
      include: { images: true },
      orderBy: { date: "asc" },
    });
  else
    items = await prisma.drawing.findMany({
      where: {
        category: null,
      },
      orderBy: { date: "asc" },
    });

  const count = items.length;
  return count > 0
    ? {
        id: 0,
        key: "no-category",
        value: "Sans catégorie",
        count,
        content: getEmptyContent(),
        items,
      }
    : null;
};

export const queryCategory = async (
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
  categoryKey: string,
): Promise<CategoryFull> => {
  if (type === Type.PAINTING)
    return await prisma.paintingCategory.findUnique({
      where: { key: categoryKey },
      include: {
        content: true,
        paintings: {
          orderBy: { date: "asc" },
        },
      },
    });
  else if (type === Type.SCULPTURE)
    return await prisma.sculptureCategory.findUnique({
      where: { key: categoryKey },
      include: {
        content: true,
        sculptures: {
          include: { images: true },
          orderBy: { date: "asc" },
        },
      },
    });
  else
    return await prisma.drawingCategory.findUnique({
      where: { key: categoryKey },
      include: {
        content: true,
        drawings: {
          orderBy: { date: "asc" },
        },
      },
    });
};

export const queryCategories = async (
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
): Promise<CategoryFull> => {
  if (type === Type.PAINTING)
    return prisma.paintingCategory.findMany({
      where: {
        paintings: {
          some: {},
        },
      },
      include: { content: true },
    });
  else if (type === Type.SCULPTURE)
    return prisma.sculptureCategory.findMany({
      where: {
        sculptures: {
          some: {},
        },
      },
      include: { content: true },
    });
  else
    return prisma.drawingCategory.findMany({
      where: {
        drawings: {
          some: {},
        },
      },
      include: { content: true },
    });
};

export const queryAllCategories = async (
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
): Promise<CategoryFull> => {
  if (type === Type.PAINTING)
    return prisma.paintingCategory.findMany({
      include: {
        content: true,
        paintings: true,
      },
    });
  else if (type === Type.SCULPTURE)
    return prisma.sculptureCategory.findMany({
      include: {
        content: true,
        sculptures: {
          include: { images: true },
        },
      },
    });
  else
    return prisma.drawingCategory.findMany({
      include: {
        content: true,
        drawings: true,
      },
    });
};
