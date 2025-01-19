import prisma from "@/lib/db/prisma";
import { ItemFull } from "@/lib/db/item";
import "server-only";

export async function getPaintingsFull(): Promise<ItemFull[]> {
  const res = await prisma.painting.findMany({
    orderBy: { date: "asc" },
    include: { category: true },
  });
  return JSON.parse(JSON.stringify(res));
}

export async function getPaintingsFullByCategory(
  categoryKey: string,
): Promise<ItemFull[]> {
  const res =
    categoryKey === "no-category"
      ? await prisma.painting.findMany({
          where: {
            category: null,
          },
          orderBy: { date: "asc" },
          include: { category: true },
        })
      : await prisma.painting.findMany({
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

export async function getYearsForPainting(): Promise<number[]> {
  let res = await prisma.painting.findMany({
    distinct: ["date"],
    select: {
      date: true,
    },
    orderBy: { date: "asc" },
  });

  const years: number[] = [];
  for await (const painting of res) {
    const date = new Date(painting.date);
    years.push(date.getFullYear());
  }

  return JSON.parse(JSON.stringify(years));
}
