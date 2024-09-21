import prisma from "@/lib/db/prisma";
import { PaintingFull } from "@/lib/db/item";
import "server-only";

export async function getPaintingsFull(): Promise<PaintingFull[]> {
  const res = await prisma.painting.findMany({
    include: { category: true },
  });
  return JSON.parse(JSON.stringify(res));
}

export async function getPaintingsFullByCategory(
  categoryKey: string,
): Promise<PaintingFull[]> {
  const res =
    categoryKey === "no-category"
      ? await prisma.painting.findMany({
          where: {
            category: null,
          },
          include: { category: true },
        })
      : await prisma.painting.findMany({
          where: {
            category: {
              key: categoryKey,
            },
          },
          include: { category: true },
        });

  return JSON.parse(JSON.stringify(res));
}
