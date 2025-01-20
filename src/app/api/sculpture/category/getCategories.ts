import prisma from "@/lib/db/prisma";
import "server-only";
import { CategoryFull } from "@/lib/db/item";

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
