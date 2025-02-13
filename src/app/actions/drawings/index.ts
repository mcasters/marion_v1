"use server";
import {
  CategoryFull,
  DrawingCategoriesFull,
  DrawingsFull,
  ItemFull,
} from "@/lib/type";
import prisma from "@/lib/prisma";
import { getEmptyContent } from "@/utils/commonUtils";

export async function getYearsForDraw(): Promise<number[]> {
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

export async function getDrawingsByYear(year: string): Promise<ItemFull[]> {
  const res = await prisma.drawing.findMany({
    where: {
      date: {
        gte: new Date(`${year}-01-01`),
        lte: new Date(`${year}-12-31`),
      },
    },
    orderBy: { date: "asc" },
  });

  return JSON.parse(JSON.stringify(res));
}

export async function getDrawCategories(): Promise<CategoryFull[]> {
  const categories: DrawingCategoriesFull =
    await prisma.drawingCategory.findMany({
      where: {
        drawings: {
          some: {},
        },
      },
      include: {
        content: true,
      },
    });

  const drawingWithNoCategory: DrawingsFull = await prisma.drawing.findMany({
    where: {
      category: null,
    },
  });

  const count = drawingWithNoCategory.length;
  if (count > 0) {
    categories.push({
      id: 0,
      key: "no-category",
      value: "Sans catégorie",
      count,
      content: getEmptyContent(),
      items: drawingWithNoCategory,
    });
  }

  return JSON.parse(JSON.stringify(categories));
}

export async function getDrawCategoryByKey(
  categoryKey: string,
): Promise<CategoryFull> {
  let category;

  if (categoryKey === "no-category") {
    const drawingWithNoCategory: DrawingsFull = await prisma.drawing.findMany({
      where: {
        category: null,
      },
      orderBy: { date: "asc" },
    });

    category = {
      id: 0,
      key: "no-category",
      value: "Sans catégorie",
      count: drawingWithNoCategory.length,
      content: getEmptyContent(),
      items: drawingWithNoCategory,
    };
  } else {
    category = await prisma.drawingCategory.findUnique({
      where: { key: categoryKey },
      include: {
        content: true,
        drawings: {
          orderBy: { date: "asc" },
        },
      },
    });

    if (category && !category.content) {
      const id = category.id;
      category = await prisma.drawingCategory.update({
        where: { id },
        data: {
          content: {
            create: {
              title: "",
              text: "",
              imageFilename: "",
              imageWidth: 0,
              imageHeight: 0,
            },
          },
        },
        include: {
          content: true,
          drawings: {
            orderBy: { date: "asc" },
          },
        },
      });
    }
  }

  return JSON.parse(JSON.stringify(category));
}

// Categories with also no Items inside
export async function getDrawCategoriesAdmin(): Promise<CategoryFull[]> {
  const categories: DrawingCategoriesFull =
    await prisma.drawingCategory.findMany({
      include: {
        content: true,
        drawings: true,
      },
    });

  if (categories.length > 0) {
    const drawingWithNoCategory: DrawingsFull = await prisma.drawing.findMany({
      where: {
        category: null,
      },
    });

    const count = drawingWithNoCategory.length;
    if (count > 0) {
      categories.push({
        id: 0,
        key: "no-category",
        value: "Sans catégorie",
        count,
        content: getEmptyContent(),
        items: drawingWithNoCategory,
      });
    }
  }

  return JSON.parse(JSON.stringify(categories));
}
