"use server";
import { CategoryFull, ItemFull } from "@/lib/type";
import prisma from "@/lib/prisma";
import { getEmptyCategory, getEmptyContent } from "@/utils/commonUtils";

export async function getDrawingsFull(): Promise<ItemFull[]> {
  const res = await prisma.drawing.findMany({
    orderBy: { date: "asc" },
    include: { category: true },
  });
  return JSON.parse(JSON.stringify(res));
}

export async function getFullCategoryWithFullDrawings(
  categoryKey: string,
): Promise<CategoryFull> {
  let res;

  if (categoryKey === "no-category") {
    const items = await prisma.drawing.findMany({
      where: {
        category: null,
      },
      orderBy: { date: "asc" },
    });
    res = {
      ...getEmptyCategory(),
      key: categoryKey,
      value: "Sans catégorie",
      items,
    };
  } else {
    res = await prisma.drawingCategory.findUnique({
      where: {
        key: categoryKey,
      },
      include: {
        content: true,
        drawings: true,
      },
    });
  }
  return JSON.parse(JSON.stringify(res));
}

export async function getYearsForDrawing(): Promise<number[]> {
  const res = await prisma.drawing.findMany({
    distinct: ["date"],
    select: {
      date: true,
    },
    orderBy: { date: "asc" },
  });

  const years: number[] = [];
  for await (const drawing of res) {
    const date = new Date(drawing.date);
    years.push(date.getFullYear());
  }

  const uniqYears = [...new Set(years)];

  return JSON.parse(JSON.stringify(uniqYears));
}

export async function getDrawingCategoriesFull(): Promise<CategoryFull[]> {
  const categories = await prisma.drawingCategory.findMany({
    include: {
      _count: {
        select: { drawings: true },
      },
      content: true,
      drawings: true,
    },
  });

  let updatedCategories;

  if (categories.length === 0) {
    updatedCategories = categories;
  } else {
    updatedCategories = categories.map((categorie) => {
      const { _count, content, ...rest } = categorie;
      return {
        count: _count.drawings,
        content: content ? content : getEmptyContent(),
        ...rest,
      };
    });

    const drawingWithoutCategory = await prisma.drawing.findMany({
      where: {
        category: null,
      },
    });

    const drawingWithoutCategory_count = drawingWithoutCategory.length;
    if (drawingWithoutCategory_count > 0) {
      updatedCategories.push({
        count: drawingWithoutCategory_count,
        key: "no-category",
        value: "Sans catégorie",
        id: 0,
        content: getEmptyContent(),
      });
    }
  }
  return JSON.parse(JSON.stringify(updatedCategories));
}
