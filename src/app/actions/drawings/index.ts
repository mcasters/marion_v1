"use server";
import { CategoryFull, ItemFull } from "@/lib/type";
import prisma from "@/lib/prisma";
import { getEmptyContent } from "@/utils/commonUtils";

export async function getDrawingsFull(): Promise<ItemFull[]> {
  const res = await prisma.drawing.findMany({
    orderBy: { date: "asc" },
  });
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
  let categoryWithItems: CategoryFull[] = [];

  const categories = await prisma.drawingCategory.findMany({
    include: {
      content: true,
      drawings: true,
    },
  });

  if (categories.length > 0) {
    let itemsInCategory = false;
    categories.forEach((categorie) => {
      if (categorie.drawings.length > 0) {
        itemsInCategory = true;
        const { drawings, ...rest } = categorie;
        categoryWithItems.push({
          items: drawings,
          count: undefined,
          ...rest,
        } as CategoryFull);
      }
    });

    if (itemsInCategory) {
      const drawingWithNoCategory = await prisma.drawing.findMany({
        where: {
          category: null,
        },
      });

      if (drawingWithNoCategory.length > 0)
        categoryWithItems.push({
          id: 0,
          key: "no-category",
          value: "Sans catégorie",
          count: undefined,
          content: getEmptyContent(),
          items: drawingWithNoCategory as ItemFull[],
        });
    }
  }

  return JSON.parse(JSON.stringify(categoryWithItems));
}

// Categories with also no Items inside
export async function getAdminDrawingCategories(): Promise<CategoryFull[]> {
  let updatedCategories: CategoryFull[] = [];

  const categories = await prisma.drawingCategory.findMany({
    include: {
      content: true,
      drawings: true,
    },
  });

  if (categories.length > 0) {
    updatedCategories = categories.map((categorie) => {
      const { drawings, ...rest } = categorie;
      return {
        count: drawings.length,
        items: drawings,
        ...rest,
      } as CategoryFull;
    });

    const drawingWithNoCategory = await prisma.drawing.findMany({
      where: {
        category: null,
      },
    });

    const count = drawingWithNoCategory.length;
    if (count > 0) {
      updatedCategories.push({
        id: 0,
        key: "no-category",
        value: "Sans catégorie",
        count,
        content: getEmptyContent(),
        items: drawingWithNoCategory as ItemFull[],
      });
    }
  }

  return JSON.parse(JSON.stringify(updatedCategories));
}
