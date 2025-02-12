"use server";
import prisma from "@/lib/prisma";
import {
  CategoryFull,
  ItemFull,
  SculptureCategoriesFull,
  SculpturesFull,
} from "@/lib/type";
import { getEmptyContent } from "@/utils/commonUtils";

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

export async function getSculptureCategories(): Promise<CategoryFull[]> {
  const categories: SculptureCategoriesFull =
    await prisma.sculptureCategory.findMany({
      where: {
        sculptures: {
          some: {},
        },
      },
      include: {
        content: true,
        sculptures: true,
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

export async function getSculptureCategoryByKey(
  categoryKey: string,
): Promise<CategoryFull> {
  let category;

  if (categoryKey === "no-category") {
    const sculptureWithNoCategory: SculpturesFull =
      await prisma.sculpture.findMany({
        where: {
          category: null,
        },
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
export async function getAdminSculptureCategories(): Promise<CategoryFull[]> {
  let updatedCategories: CategoryFull[] = [];

  const categories = await prisma.sculptureCategory.findMany({
    include: {
      content: true,
      sculptures: {
        include: { images: true },
      },
    },
  });

  if (categories.length > 0) {
    updatedCategories = categories.map((categorie) => {
      const { sculptures, ...rest } = categorie;
      return {
        count: sculptures.length,
        items: sculptures,
        ...rest,
      } as CategoryFull;
    });

    const sculptureWithNoCategory = await prisma.sculpture.findMany({
      where: {
        category: null,
      },
      include: { images: true },
    });

    const count = sculptureWithNoCategory.length;
    if (count > 0) {
      updatedCategories.push({
        id: 0,
        key: "no-category",
        value: "Sans catégorie",
        count,
        content: getEmptyContent(),
        items: sculptureWithNoCategory as ItemFull[],
      });
    }
  }

  return JSON.parse(JSON.stringify(updatedCategories));
}
