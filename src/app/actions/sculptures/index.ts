"use server";
import prisma from "@/lib/prisma";
import { CategoryFull, ItemFull } from "@/lib/type";
import { getEmptyContent } from "@/utils/commonUtils";

export async function getSculpturesFull(): Promise<ItemFull[]> {
  const res = await prisma.sculpture.findMany({
    orderBy: { date: "asc" },
    include: { images: true },
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

export async function getFilledSculptureCategories(): Promise<CategoryFull[]> {
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
    let itemsInCategory = false;
    categories.forEach((categorie) => {
      if (categorie.sculptures.length > 0) {
        itemsInCategory = true;
        const { sculptures, ...rest } = categorie;
        updatedCategories.push({
          items: sculptures,
          count: 0,
          ...rest,
        } as CategoryFull);
      }
    });

    if (itemsInCategory) {
      const sculptureWithNoCategory = await prisma.sculpture.findMany({
        where: {
          category: null,
        },
        include: { images: true },
      });

      if (sculptureWithNoCategory.length > 0) {
        updatedCategories.push({
          id: 0,
          key: "no-category",
          value: "Sans catégorie",
          count: 0,
          content: getEmptyContent(),
          items: sculptureWithNoCategory as ItemFull[],
        });
      }
    }
  }

  return JSON.parse(JSON.stringify(updatedCategories));
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
