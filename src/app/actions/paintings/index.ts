"use server";
import prisma from "@/lib/prisma";
import {
  CategoryFull,
  ItemFull,
  PaintingCategoriesFull,
  PaintingsFull,
} from "@/lib/type";
import { getEmptyContent } from "@/utils/commonUtils";

export async function getYearsForPaint(): Promise<number[]> {
  const res = await prisma.painting.findMany({
    distinct: ["date"],
    select: {
      date: true,
    },
    orderBy: { date: "asc" },
  });

  const years: number[] = [];
  for await (const painting of res) {
    const date = new Date(painting.date);
    years.push(date.getFullYear());
  }

  const uniqYears = [...new Set(years)];

  return JSON.parse(JSON.stringify(uniqYears));
}

export async function getPaintingsByYear(year: string): Promise<ItemFull[]> {
  const res = await prisma.painting.findMany({
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

export async function getPaintCategories(): Promise<CategoryFull[]> {
  const categories: PaintingCategoriesFull =
    await prisma.paintingCategory.findMany({
      where: {
        paintings: {
          some: {},
        },
      },
      include: {
        content: true,
      },
    });

  const paintingWithNoCategory: PaintingsFull = await prisma.painting.findMany({
    where: {
      category: null,
    },
  });

  const count = paintingWithNoCategory.length;
  if (count > 0) {
    categories.push({
      id: 0,
      key: "no-category",
      value: "Sans catégorie",
      count,
      content: getEmptyContent(),
      items: paintingWithNoCategory,
    });
  }

  return JSON.parse(JSON.stringify(categories));
}

export async function getPaintCategoryByKey(
  categoryKey: string,
): Promise<CategoryFull> {
  let category;

  if (categoryKey === "no-category") {
    const paintingWithNoCategory: PaintingsFull =
      await prisma.painting.findMany({
        where: {
          category: null,
        },
        orderBy: { date: "asc" },
      });

    category = {
      id: 0,
      key: "no-category",
      value: "Sans catégorie",
      count: paintingWithNoCategory.length,
      content: getEmptyContent(),
      items: paintingWithNoCategory,
    };
  } else {
    category = await prisma.paintingCategory.findUnique({
      where: { key: categoryKey },
      include: {
        content: true,
        paintings: {
          orderBy: { date: "asc" },
        },
      },
    });

    if (category && !category.content) {
      const id = category.id;
      category = await prisma.paintingCategory.update({
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
          paintings: {
            orderBy: { date: "asc" },
          },
        },
      });
    }
  }

  return JSON.parse(JSON.stringify(category));
}

// Categories with also no Items inside
export async function getPaintCategoriesAdmin(): Promise<CategoryFull[]> {
  const categories: PaintingCategoriesFull =
    await prisma.paintingCategory.findMany({
      include: {
        content: true,
        paintings: true,
      },
    });

  if (categories.length > 0) {
    const paintingWithNoCategory: PaintingsFull =
      await prisma.painting.findMany({
        where: {
          category: null,
        },
      });

    const count = paintingWithNoCategory.length;
    if (count > 0) {
      categories.push({
        id: 0,
        key: "no-category",
        value: "Sans catégorie",
        count,
        content: getEmptyContent(),
        items: paintingWithNoCategory,
      });
    }
  }
  return JSON.parse(JSON.stringify(categories));
}
