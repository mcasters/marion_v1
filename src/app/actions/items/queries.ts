import { unstable_cache } from "next/cache";
import { Category, ItemFull, Type } from "@/lib/type";
import prisma from "@/lib/prisma";
import { getNoCategory } from "@/utils/commonUtils";

export async function cache<S>(
  fn: () => Promise<S>,
  isAdmin: boolean,
  key: string,
): Promise<S> {
  const query = isAdmin
    ? fn
    : unstable_cache(async () => fn(), [key], {
        revalidate: 60,
        tags: [key],
      });
  return query();
}

export const KEYS = {
  [Type.PAINTING]: {
    items: "paintings",
    itemsByYear: "paintingsByYear",
    itemsByCategory: "paintingsByYear",
    noCategory: "paintingsWithNoCategory",
    categories: "paintingCategories",
    category: "paintingCategory",
    years: "paintingYears",
  },
  [Type.SCULPTURE]: {
    items: "sculptures",
    itemsByYear: "sculpturesByYear",
    itemsByCategory: "sculturessByYear",
    noCategory: "sculpturesWithNoCategory",
    categories: "sculptureCategories",
    category: "sculptureCategory",
    years: "sculptureYears",
  },
  [Type.DRAWING]: {
    items: "drawings",
    itemsByYear: "drawingsByYear",
    itemsByCategory: "drawingsByYear",
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

export const queryItemsByCategory = async (
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
  categoryKey: string,
): Promise<ItemFull[]> => {
  if (type === Type.PAINTING) {
    if (categoryKey === "no-category")
      return await prisma.painting.findMany({
        where: {
          category: null,
        },
        orderBy: { date: "asc" },
      });
    return await prisma.painting.findMany({
      where: {
        category: { key: categoryKey },
      },
      orderBy: { date: "asc" },
    });
  } else if (type === Type.SCULPTURE) {
    if (categoryKey === "no-category")
      return await prisma.sculpture.findMany({
        where: {
          category: null,
        },
        include: { images: true },
        orderBy: { date: "asc" },
      });
    return await prisma.sculpture.findMany({
      where: {
        category: { key: categoryKey },
      },
      include: { images: true },
      orderBy: { date: "asc" },
    });
  } else {
    if (categoryKey === "no-category")
      return await prisma.drawing.findMany({
        where: {
          category: null,
        },
        orderBy: { date: "asc" },
      });
    return await prisma.drawing.findMany({
      where: {
        category: { key: categoryKey },
      },
      orderBy: { date: "asc" },
    });
  }
};

export const queryNoCategory = async (
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
): Promise<Category | null> => {
  let items;
  if (type === Type.PAINTING)
    items = await prisma.painting.findMany({
      where: {
        category: null,
      },
    });
  else if (type === Type.SCULPTURE)
    items = await prisma.sculpture.findMany({
      where: {
        category: null,
      },
    });
  else
    items = await prisma.drawing.findMany({
      where: {
        category: null,
      },
    });

  return items.length > 0 ? getNoCategory() : null;
};

export const queryCategory = async (
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
  categoryKey: string,
): Promise<Category | null> => {
  if (type === Type.PAINTING)
    return await prisma.paintingCategory.findUnique({
      where: { key: categoryKey },
      include: {
        content: true,
      },
    });
  else if (type === Type.SCULPTURE)
    return await prisma.sculptureCategory.findUnique({
      where: { key: categoryKey },
      include: {
        content: true,
      },
    });
  else
    return await prisma.drawingCategory.findUnique({
      where: { key: categoryKey },
      include: {
        content: true,
      },
    });
};

export const queryCategories = async (
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
): Promise<Category[]> => {
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
): Promise<Category[]> => {
  if (type === Type.PAINTING)
    return prisma.paintingCategory.findMany({
      include: {
        content: true,
      },
    });
  else if (type === Type.SCULPTURE)
    return prisma.sculptureCategory.findMany({
      include: {
        content: true,
      },
    });
  else
    return prisma.drawingCategory.findMany({
      include: {
        content: true,
      },
    });
};

export const queryAllItems = async (
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING,
): Promise<ItemFull[]> => {
  if (type === Type.PAINTING)
    return await prisma.painting.findMany({
      orderBy: { date: "asc" },
    });
  else if (type === Type.SCULPTURE)
    return await prisma.sculpture.findMany({
      include: { images: true },
      orderBy: { date: "asc" },
    });
  else
    return await prisma.drawing.findMany({
      orderBy: { date: "asc" },
    });
};
