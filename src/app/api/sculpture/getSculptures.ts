import prisma from "@/lib/db/prisma";
import "server-only";
import { ItemFull } from "@/lib/db/item";

export async function getSculpturesFull(): Promise<ItemFull[]> {
  const res = await prisma.sculpture.findMany({
    orderBy: { date: "asc" },
    include: { images: true, category: true },
  });
  return JSON.parse(JSON.stringify(res));
}

export async function getSculpturesFullByCategory(
  categoryKey: string,
): Promise<ItemFull[]> {
  const res =
    categoryKey === "no-category"
      ? await prisma.sculpture.findMany({
          where: {
            category: null,
          },
          orderBy: { date: "asc" },
          include: { images: true, category: true },
        })
      : await prisma.sculpture.findMany({
          where: {
            category: {
              key: categoryKey,
            },
          },
          orderBy: { date: "asc" },
          include: { images: true, category: true },
        });
  return JSON.parse(JSON.stringify(res));
}

export async function getYearsForSculpture(): Promise<number[]> {
  const res = await prisma.sculpture.findMany({
    distinct: ["date"],
    select: {
      date: true,
    },
    orderBy: { date: "asc" },
  });

  const years: number[] = [];
  for await (const sculpture of res) {
    const date = new Date(sculpture.date);
    years.push(date.getFullYear());
  }

  const uniqYears = [...new Set(years)];

  return JSON.parse(JSON.stringify(uniqYears));
}
