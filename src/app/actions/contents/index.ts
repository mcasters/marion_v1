"use server";
import prisma from "@/lib/prisma";

export async function getContentsFull() {
  const res = await prisma.content.findMany({ include: { images: true } });
  return JSON.parse(JSON.stringify(res));
}
