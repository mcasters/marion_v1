import prisma from "@/lib/db/prisma";
import { PaintingCategory } from "@prisma/client";
import "server-only";
import { CategoryFull } from "@/lib/db/item";

export async function getPaintingCategoriesFull(): Promise<CategoryFull[]> {
  const res = await prisma.paintingCategory.findMany({
    include: {
      _count: {
        select: { paintings: true },
      },
    },
  });

  const updatedTab = res.map((categorie) => {
    const { _count, ...rest } = categorie;
    return { count: _count.paintings, ...rest };
  });

  return JSON.parse(JSON.stringify(updatedTab));
}

export async function getPaintingCategoriesForMenu() {
  const categories =
    (await prisma.paintingCategory.findMany()) as PaintingCategory[];
  const paintingWithoutCategory = await prisma.painting.findFirst({
    where: {
      category: null,
    },
  });
  if (categories.length > 0 && paintingWithoutCategory)
    categories.push({
      key: "no-category",
      value: "Sans catégorie",
      id: 0,
    } as PaintingCategory);
  return JSON.parse(JSON.stringify(categories));
}
