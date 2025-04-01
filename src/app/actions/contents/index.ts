"use server";
import prisma from "@/lib/prisma";
import { cacheDBDatas } from "@/app/actions/actionUtils";
import { ContentFull } from "@/lib/type";

export async function getContentsFull(): Promise<ContentFull[]> {
  const contents = await cacheDBDatas(
    async () => await prisma.content.findMany({ include: { images: true } }),
    "contents",
  );
  return JSON.parse(JSON.stringify(contents));
}
