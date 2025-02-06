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

export async function getFilledDrawingCategories(): Promise<CategoryFull[]> {
  const categories: CategoryFull[] = await prisma.drawingCategory.findMany({
    include: {
      content: true,
      drawings: true,
    },
  });

  let updatedCategories: CategoryFull[] = [];

  if (categories.length === 0) {
    updatedCategories = categories;
  } else {
    categories.forEach((categorie) => {
      if (categorie.items.length > 0) {
        const { content, drawings, ...rest } = categorie;
        updatedCategories.push({
          count: drawings.length,
          content: content ? content : getEmptyContent(),
          ...rest,
        });
      }
    });

    const drawingWithNoCategory = await prisma.drawing.findMany({
      where: {
        category: null,
      },
    });

    const drawingWithNoCategory_count = drawingWithNoCategory.length;
    if (drawingWithNoCategory_count > 0)
      updatedCategories.push({
        count: drawingWithNoCategory_count,
        key: "no-category",
        value: "Sans catégorie",
        id: 0,
        content: getEmptyContent(),
        items: drawingWithNoCategory,
      });
  }

  return JSON.parse(JSON.stringify(updatedCategories));
}

export async function getAdminDrawingCategories(): Promise<CategoryFull[]> {
  const categories = await prisma.drawingCategory.findMany({
    include: {
      content: true,
      drawings: true,
    },
  });

  let updatedCategories;

  if (categories.length === 0) {
    updatedCategories = categories;
  } else {
    updatedCategories = categories.map((categorie) => {
      const { content, drawings, ...rest } = categorie;
      return {
        count: drawings.length,
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
