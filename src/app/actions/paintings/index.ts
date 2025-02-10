"use server";
import prisma from "@/lib/prisma";
import { CategoryFull, ItemFull } from "@/lib/type";
import { getEmptyContent } from "@/utils/commonUtils";

export async function getPaintingsFull(): Promise<ItemFull[]> {
  const res = await prisma.painting.findMany({
    orderBy: { date: "asc" },
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

export async function getFilledPaintingCategories(): Promise<CategoryFull[]> {
  let updatedCategories: CategoryFull[] = [];

  const categories = await prisma.paintingCategory.findMany({
    include: {
      content: true,
      paintings: true,
    },
  });

  if (categories.length > 0) {
    let itemsInCategory = false;
    categories.forEach((categorie) => {
      if (categorie.paintings.length > 0) {
        itemsInCategory = true;
        const { paintings, ...rest } = categorie;
        updatedCategories.push({
          items: paintings,
          count: undefined,
          ...rest,
        } as CategoryFull);
      }
    });

    if (itemsInCategory) {
      const paintingWithNoCategory = await prisma.painting.findMany({
        where: {
          category: null,
        },
      });

      if (paintingWithNoCategory.length > 0)
        updatedCategories.push({
          id: 0,
          key: "no-category",
          value: "Sans catégorie",
          count: undefined,
          content: getEmptyContent(),
          items: paintingWithNoCategory as ItemFull[],
        });
    }
  }

  return JSON.parse(JSON.stringify(updatedCategories));
}

// Categories with also no Items inside
export async function getAdminPaintingCategories(): Promise<CategoryFull[]> {
  let updatedCategories: CategoryFull[] = [];

  const categories = await prisma.paintingCategory.findMany({
    include: {
      content: true,
      paintings: true,
    },
  });

  if (categories.length > 0) {
    updatedCategories = categories.map((categorie) => {
      const { paintings, ...rest } = categorie;
      return {
        count: paintings.length,
        items: paintings,
        ...rest,
      } as CategoryFull;
    });

    const paintingWithNoCategory = await prisma.painting.findMany({
      where: {
        category: null,
      },
    });

    const count = paintingWithNoCategory.length;
    if (count > 0) {
      updatedCategories.push({
        id: 0,
        key: "no-category",
        value: "Sans catégorie",
        count,
        content: getEmptyContent(),
        items: paintingWithNoCategory as ItemFull[],
      });
    }
  }
  return JSON.parse(JSON.stringify(updatedCategories));
}
