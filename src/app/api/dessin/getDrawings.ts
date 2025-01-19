import prisma from "@/lib/db/prisma";
import "server-only";
import { ItemFull } from "@/lib/db/item";

export async function getDrawingsFull(): Promise<ItemFull[]> {
  const res = await prisma.drawing.findMany({
    orderBy: { date: "asc" },
    include: { category: true },
  });
  return JSON.parse(JSON.stringify(res));
}

export async function getDrawingsFullByCategory(
  categoryKey: string,
): Promise<ItemFull[]> {
  const res =
    categoryKey === "no-category"
      ? await prisma.drawing.findMany({
          where: {
            category: null,
          },
          orderBy: { date: "asc" },
          include: { category: true },
        })
      : await prisma.drawing.findMany({
          where: {
            category: {
              key: categoryKey,
            },
          },
          orderBy: { date: "asc" },
          include: { category: true },
        });

  return JSON.parse(JSON.stringify(res));
}

export async function getYearsForDrawing(): Promise<number[]> {
  let res = await prisma.drawing.findMany({
    distinct: ["date"],
    select: {
      date: true,
    },
    orderBy: { date: "asc" },
  });

  const years: number[] = [];
  for await (const drawing of res) {
    const date = new Date(drawing.date);
    years.push(date.getFullYear());
  }

  return JSON.parse(JSON.stringify(years));
}
