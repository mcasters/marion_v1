import prisma from "@/lib/db/prisma";
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

  const paintingWithoutCategory = await prisma.painting.findMany({
    where: {
      category: null,
    },
  });

  const paintingWithoutCategory_count = paintingWithoutCategory.length;
  if (paintingWithoutCategory_count > 0) {
    updatedTab.push({
      count: paintingWithoutCategory_count,
      key: "no-category",
      value: "Sans catégorie",
      id: 0,
    });
  }

  return JSON.parse(JSON.stringify(updatedTab));
}
