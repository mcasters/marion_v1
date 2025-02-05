"use server";
import prisma from "@/lib/prisma";
import { CategoryFull, ItemFull } from "@/lib/type";
import { getEmptyContent } from "@/utils/commonUtils";

export async function getPaintingsFull(): Promise<ItemFull[]> {
  const res = await prisma.painting.findMany({
    orderBy: { date: "asc" },
    include: { category: true },
  });
  return JSON.parse(JSON.stringify(res));
}

export async function getPaintingsFullByCategory(
  categoryKey: string,
): Promise<ItemFull[]> {
  const res =
    categoryKey === "no-category"
      ? await prisma.painting.findMany({
          where: {
            category: null,
          },
          orderBy: { date: "asc" },
          include: { category: true },
        })
      : await prisma.painting.findMany({
          where: {
            category: {
              key: categoryKey,
            },
          },
          orderBy: { date: "asc" },
          include: { category: true },
        });

  return JSON.parse(JSON.stringify(res));
}

export async function getYearsForPainting(): Promise<number[]> {
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

export async function getPaintingCategoriesFull(): Promise<CategoryFull[]> {
  const categories = await prisma.paintingCategory.findMany({
    include: {
      _count: {
        select: { paintings: true },
      },
      content: true,
    },
  });

  let updatedCategories;

  if (categories.length === 0) {
    updatedCategories = categories;
  } else {
    updatedCategories = categories.map((categorie) => {
      const { _count, content, ...rest } = categorie;
      return {
        count: _count.paintings,
        content: content ? content : getEmptyContent(),
        ...rest,
      };
    });

    const paintingWithoutCategory = await prisma.painting.findMany({
      where: {
        category: null,
      },
    });

    const paintingWithoutCategory_count = paintingWithoutCategory.length;
    if (paintingWithoutCategory_count > 0) {
      updatedCategories.push({
        count: paintingWithoutCategory_count,
        key: "no-category",
        value: "Sans catégorie",
        id: 0,
        content: getEmptyContent(),
      });
    }
  }
  return JSON.parse(JSON.stringify(updatedCategories));
}
