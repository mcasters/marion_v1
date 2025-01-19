import prisma from "@/lib/db/prisma";
import "server-only";
import { CategoryFull, Type } from "@/lib/db/item";

export async function getDrawingCategoriesFull(): Promise<CategoryFull[]> {
  const res = await prisma.drawingCategory.findMany({
    include: {
      _count: {
        select: { drawings: true },
      },
    },
  });

  const updatedTab = res.map((categorie) => {
    const { _count, ...rest } = categorie;
    return { count: _count.drawings, ...rest, type: Type.CATEGORY };
  });

  const drawingWithoutCategory = await prisma.drawing.findMany({
    where: {
      category: null,
    },
  });

  const drawingWithoutCategory_count = drawingWithoutCategory.length;
  if (drawingWithoutCategory_count > 0) {
    updatedTab.push({
      type: Type.CATEGORY,
      count: drawingWithoutCategory_count,
      key: "no-category",
      value: "Sans catégorie",
      id: 0,
    });
  }

  return JSON.parse(JSON.stringify(updatedTab));
}
