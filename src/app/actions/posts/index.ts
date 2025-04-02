"use server";
import { PostFull } from "@/lib/type";
import prisma from "@/lib/prisma";

import { cacheDatas } from "@/utils/serverUtils";

export async function getPostsFull(): Promise<PostFull[]> {
  const posts = await cacheDatas(
    async () =>
      await prisma.post.findMany({
        include: { images: true },
      }),
    "posts",
  );

  return JSON.parse(JSON.stringify(posts));
}
