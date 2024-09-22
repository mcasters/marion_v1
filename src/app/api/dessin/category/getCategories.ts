import prisma from "@/lib/db/prisma";
import "server-only";
import { Category, CategoryFull } from "@/lib/db/item";

export async function getDrawingCategoriesFull(): Promise<CategoryFull[]> {
  const res = await prisma.drawingCategory.findMany({
    include: {
      _count: {
        select: { drawings: true },
      },
    },
  });
}

export async function getDrawingCategoriesForMenu(): Promise<Category[]> {
  const categories = await prisma.drawingCategory.findMany();
  const drawingWithoutCategory = await prisma.drawing.findFirst({
    where: {
      category: null,
    },
  });
  if (categories.length > 0 && drawingWithoutCategory)
    categories.push({
      key: "no-category",
      value: "Sans catégorie",
      id: 0,
    });
  return JSON.parse(JSON.stringify(categories));
}
