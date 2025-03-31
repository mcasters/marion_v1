"use server";
import prisma from "@/lib/prisma";
import { cacheDBDatas } from "@/app/actions/actionUtils";
import { ContentFull } from "@/lib/type";

export async function getContentsFull(
  isAdmin: boolean,
): Promise<ContentFull[]> {
  const contents = await cacheDBDatas(
    () => queryContentsFull(),
    isAdmin,
    "contents",
  );
  return JSON.parse(JSON.stringify(contents));
}

const queryContentsFull = async (): Promise<ContentFull[]> => {
  return await prisma.content.findMany({ include: { images: true } });
};
