"use server";
import { PostFull } from "@/lib/type";
import prisma from "@/lib/prisma";
import { cacheDBDatas } from "@/app/actions/actionUtils";

export async function getPostsFull(): Promise<PostFull[]> {
  const posts = await cacheDBDatas(
    async () =>
      await prisma.post.findMany({
        include: { images: true },
      }),
    "posts",
  );

  return JSON.parse(JSON.stringify(posts));
}
