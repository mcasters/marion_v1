import prisma from "@/lib/db/prisma";
import "server-only";
import { DrawingFull } from "@/lib/db/item";

export async function getDrawingsFull(): Promise<DrawingFull[]> {
  const res = await prisma.drawing.findMany({
    include: { category: true },
  });
  return JSON.parse(JSON.stringify(res));
}

export async function getDrawingsFullByCategory(
  categoryKey: string,
): Promise<DrawingFull[]> {
  const res =
    categoryKey === "no-category"
      ? await prisma.drawing.findMany({
          where: {
            category: null,
          },
          include: { category: true },
        })
      : await prisma.drawing.findMany({
          where: {
            category: {
              key: categoryKey,
            },
          },
          include: { category: true },
        });

  return JSON.parse(JSON.stringify(res));
}
