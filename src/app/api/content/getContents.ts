import prisma from "@/lib/db/prisma";
import "server-only";

export async function getContentsFull() {
  const res = await prisma.content.findMany({ include: { images: true } });
  return JSON.parse(JSON.stringify(res));
}
