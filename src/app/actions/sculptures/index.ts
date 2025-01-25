"use server";
import prisma from "@/lib/db/prisma";
import { CategoryFull, ItemFull } from "@/lib/db/item";

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
  const res = await prisma.sculptureCategory.findMany({
    include: {
      _count: {
        select: {
          sculptures: true,
        },
      },
    },
  });

  const updatedTab = res.map((categorie) => {
    const { _count, ...rest } = categorie;
    return { count: _count.sculptures, ...rest };
  });

  const sculptureWithoutCategory = await prisma.sculpture.findMany({
    where: {
      category: null,
    },
  });

  const sculptureWithoutCategory_count = sculptureWithoutCategory.length;
  if (sculptureWithoutCategory_count > 0) {
    updatedTab.push({
      count: sculptureWithoutCategory_count,
      key: "no-category",
      value: "Sans catégorie",
      id: 0,
    });
  }

  return JSON.parse(JSON.stringify(updatedTab));
}
