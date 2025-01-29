"use server";
import { PostFull } from "@/lib/model";
import prisma from "@/lib/prisma";

export async function getPostsFull(): Promise<PostFull[]> {
  const res = await prisma.post.findMany({
    include: { images: true },
  });
  return JSON.parse(JSON.stringify(res));
}
