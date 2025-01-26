"use server";
import { PostFull } from "@/lib/db/item";
import prisma from "@/lib/db/prisma";

export async function getPostsFull(): Promise<PostFull[]> {
  const res = await prisma.post.findMany({
    include: { images: true },
  });
  return JSON.parse(JSON.stringify(res));
}
