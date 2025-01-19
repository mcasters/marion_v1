import prisma from "@/lib/db/prisma";
import "server-only";
import { SculptureFull } from "@/lib/db/item";

export async function getSculpturesFull(): Promise<SculptureFull[]> {
  const res = await prisma.sculpture.findMany({
    orderBy: { date: "asc" },
    include: { images: true, category: true },
  });
  return JSON.parse(JSON.stringify(res));
}

export async function getSculpturesFullByCategory(
  categoryKey: string,
): Promise<SculptureFull[]> {
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
