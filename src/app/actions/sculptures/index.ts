"use server";
import prisma from "@/lib/prisma";
import { CategoryFull, ItemFull } from "@/lib/type";
import { getEmptyContent } from "@/utils/commonUtils";

export async function getSculpturesFull(): Promise<ItemFull[]> {
  const res = await prisma.sculpture.findMany({
    orderBy: { date: "asc" },
    include: { images: true, category: true },
  });
  return JSON.parse(JSON.stringify(res));
}

export async function getSculpturesFullByCategory(
  categoryKey: string,
): Promise<ItemFull[]> {
  const res =
    categoryKey === "no-category"
      ? await prisma.sculpture.findMany({
          where: {
            category: null,
          },
          orderBy: { date: "asc" },
          include: { images: true, category: true },
        })
      : await prisma.sculpture.findMany({
          where: {
            category: {
              key: categoryKey,
            },
          },
          orderBy: { date: "asc" },
          include: { images: true, category: true },
        });
  return JSON.parse(JSON.stringify(res));
}

export async function getYearsForSculpture(): Promise<number[]> {
  const res = await prisma.sculpture.findMany({
    distinct: ["date"],
    select: {
      date: true,
    },
    orderBy: { date: "asc" },
  });

  const years: number[] = [];
  for await (const sculpture of res) {
    const date = new Date(sculpture.date);
    years.push(date.getFullYear());
  }

  const uniqYears = [...new Set(years)];

  return JSON.parse(JSON.stringify(uniqYears));
}

export async function getSculptureCategoriesFull(): Promise<CategoryFull[]> {
  const categories = await prisma.sculptureCategory.findMany({
    include: {
      _count: {
        select: {
          sculptures: true,
        },
      },
      content: true,
      sculptures: true,
    },
  });

  let updatedCategories;

  if (categories.length === 0) {
    updatedCategories = categories;
  } else {
    updatedCategories = categories.map((categorie) => {
      const { _count, content, ...rest } = categorie;
      return {
        count: _count.sculptures,
        content: content ? content : getEmptyContent(),
        ...rest,
      };
    });

    const sculptureWithoutCategory = await prisma.sculpture.findMany({
      where: {
        category: null,
      },
    });

    const sculptureWithoutCategory_count = sculptureWithoutCategory.length;
    if (sculptureWithoutCategory_count > 0) {
      updatedCategories.push({
        count: sculptureWithoutCategory_count,
        key: "no-category",
        value: "Sans catégorie",
        id: 0,
        content: getEmptyContent(),
      });
    }
  }
  return JSON.parse(JSON.stringify(updatedCategories));
}
