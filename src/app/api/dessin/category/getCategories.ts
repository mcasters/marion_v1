import prisma from "@/lib/db/prisma";
import { DrawingCategory } from "@prisma/client";
import "server-only";

export async function getDrawingCategoriesFull() {
  const res = await prisma.drawingCategory.findMany({
    include: { drawings: true },
  });
  return JSON.parse(JSON.stringify(res));
}

export async function getDrawingCategoriesForMenu() {
  const categories =
    (await prisma.drawingCategory.findMany()) as DrawingCategory[];
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
    } as DrawingCategory);
  return JSON.parse(JSON.stringify(categories));
}
