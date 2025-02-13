"use server";
import prisma from "@/lib/prisma";
import {
  CategoryFull,
  ItemFull,
  SculptureCategoriesFull,
  SculpturesFull,
} from "@/lib/type";
import { getEmptyContent } from "@/utils/commonUtils";

export async function getYearsForSculpt(): Promise<number[]> {
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

export async function getSculpturesByYear(year: string): Promise<ItemFull[]> {
  const res = await prisma.sculpture.findMany({
    where: {
      date: {
        gte: new Date(`${year}-01-01`),
        lte: new Date(`${year}-12-31`),
      },
    },
    include: { images: true },
    orderBy: { date: "asc" },
  });

  return JSON.parse(JSON.stringify(res));
}

export async function getSculptCategories(): Promise<CategoryFull[]> {
  const categories: SculptureCategoriesFull =
    await prisma.sculptureCategory.findMany({
      where: {
        sculptures: {
          some: {},
        },
      },
      include: {
        content: true,
      },
    });

  const sculptureWithNoCategory: SculpturesFull =
    await prisma.sculpture.findMany({
      where: {
        category: null,
      },
    });

  const count = sculptureWithNoCategory.length;
  if (count > 0) {
    categories.push({
      id: 0,
      key: "no-category",
      value: "Sans catégorie",
      count,
      content: getEmptyContent(),
      items: sculptureWithNoCategory,
    });
  }

  return JSON.parse(JSON.stringify(categories));
}

export async function getSculptCategoryByKey(
  categoryKey: string,
): Promise<CategoryFull> {
  let category;

  if (categoryKey === "no-category") {
    const sculptureWithNoCategory: SculpturesFull =
      await prisma.sculpture.findMany({
        where: {
          category: null,
        },
        include: { images: true },
        orderBy: { date: "asc" },
      });

    category = {
      id: 0,
      key: "no-category",
      value: "Sans catégorie",
      count: sculptureWithNoCategory.length,
      content: getEmptyContent(),
      items: sculptureWithNoCategory,
    };
  } else {
    category = await prisma.sculptureCategory.findUnique({
      where: { key: categoryKey },
      include: {
        content: true,
        sculptures: {
          include: { images: true },
          orderBy: { date: "asc" },
        },
      },
    });

    if (category && !category.content) {
      const id = category.id;
      category = await prisma.sculptureCategory.update({
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
          sculptures: {
            include: { images: true },
            orderBy: { date: "asc" },
          },
        },
      });
    }
  }

  return JSON.parse(JSON.stringify(category));
}

// Categories with also no Items inside
export async function getSculptCategoriesAdmin(): Promise<CategoryFull[]> {
  const categories: SculptureCategoriesFull =
    await prisma.sculptureCategory.findMany({
      include: {
        content: true,
        sculptures: {
          include: { images: true },
        },
      },
    });

  if (categories.length > 0) {
    const sculptureWithNoCategory: SculpturesFull =
      await prisma.sculpture.findMany({
        where: {
          category: null,
        },
        include: { images: true },
      });

    const count = sculptureWithNoCategory.length;
    if (count > 0) {
      categories.push({
        id: 0,
        key: "no-category",
        value: "Sans catégorie",
        count,
        content: getEmptyContent(),
        items: sculptureWithNoCategory,
      });
    }
  }

  return JSON.parse(JSON.stringify(categories));
}
