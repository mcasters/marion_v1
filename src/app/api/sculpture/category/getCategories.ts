import prisma from "@/lib/db/prisma";
import "server-only";
import { Category, CategoryFull, Type } from "@/lib/db/item";

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
    return { count: _count.sculptures, ...rest, type: Type.CATEGORY };
  });

  const sculptureWithoutCategory = await prisma.sculpture.findMany({
    where: {
      category: null,
    },
  });

  const sculptureWithoutCategory_count = sculptureWithoutCategory.length;
  if (sculptureWithoutCategory_count > 0) {
    updatedTab.push({
      type: Type.CATEGORY,
      count: sculptureWithoutCategory_count,
      key: "no-category",
      value: "SANS CATEGORIE",
      id: 0,
    });
  }

  return JSON.parse(JSON.stringify(updatedTab));
}

export async function getSculptureCategoriesForMenu(): Promise<Category[]> {
  const categories = await prisma.sculptureCategory.findMany();
  const sculptureWithoutCategory = await prisma.sculpture.findFirst({
    where: {
      category: null,
    },
  });
  if (categories.length > 0 && sculptureWithoutCategory)
    categories.push({
      key: "no-category",
      value: "Sans catégorie",
      id: 0,
    });
  return JSON.parse(JSON.stringify(categories));
}
