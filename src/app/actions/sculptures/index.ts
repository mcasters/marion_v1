"use server";
import prisma from "@/lib/prisma";
import { CategoryFull, ItemFull } from "@/lib/type";
import { getEmptyCategory, getEmptyContent } from "@/utils/commonUtils";

export async function getSculpturesFull(): Promise<ItemFull[]> {
  const res = await prisma.sculpture.findMany({
    orderBy: { date: "asc" },
    include: { images: true, category: true },
  });
  return JSON.parse(JSON.stringify(res));
}

export async function getFullCategoryWithFullSculptures(
  categoryKey: string,
): Promise<CategoryFull> {
  let res;

  if (categoryKey === "no-category") {
    const items = await prisma.sculpture.findMany({
      where: {
        category: null,
      },
      orderBy: { date: "asc" },
      include: { images: true },
    });
    res = {
      ...getEmptyCategory(),
      key: categoryKey,
      value: "Sans catégorie",
      items,
    };
  } else {
    res = await prisma.sculptureCategory.findUnique({
      where: {
        key: categoryKey,
      },
      include: {
        content: true,
        sculptures: {
          include: { images: true },
        },
      },
    });
  }
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

export async function getFilledSculptureCategories(): Promise<CategoryFull[]> {
  const categories: CategoryFull[] = await prisma.sculptureCategory.findMany({
    include: {
      content: true,
      sculptures: {
        include: { images: true },
      },
    },
  });

  let updatedCategories: CategoryFull[] = [];

  if (categories.length === 0) {
    updatedCategories = categories;
  } else {
    categories.forEach((categorie) => {
      if (categorie.items.length > 0) {
        const { content, sculptures, ...rest } = categorie;
        updatedCategories.push({
          count: sculptures.length,
          content: content ? content : getEmptyContent(),
          ...rest,
        });
      }
    });

    const sculptureWithNoCategory = await prisma.sculpture.findMany({
      where: {
        category: null,
      },
    });

    const sculptureWithNoCategory_count = sculptureWithNoCategory.length;
    if (sculptureWithNoCategory_count > 0) {
      updatedCategories.push({
        count: sculptureWithNoCategory_count,
        key: "no-category",
        value: "Sans catégorie",
        id: 0,
        content: getEmptyContent(),
        items: sculptureWithNoCategory,
      });
    }
  }

  return JSON.parse(JSON.stringify(updatedCategories));
}

export async function getAdminSculptureCategories(): Promise<CategoryFull[]> {
  const categories = await prisma.sculptureCategory.findMany({
    include: {
      content: true,
      sculptures: {
        include: { images: true },
      },
    },
  });

  let updatedCategories;

  if (categories.length === 0) {
    updatedCategories = categories;
  } else {
    updatedCategories = categories.map((categorie) => {
      const { content, sculptures, ...rest } = categorie;
      return {
        count: sculptures.length,
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
