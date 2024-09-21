import prisma from "@/lib/db/prisma";
import "server-only";
import { PostFull } from "@/lib/db/item";

export async function getPostsFull(): Promise<PostFull[]> {
  const res = await prisma.post.findMany({
    include: { images: true },
  });
  return JSON.parse(JSON.stringify(res));
}
