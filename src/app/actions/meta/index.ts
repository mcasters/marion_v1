"use server";
import prisma from "@/lib/prisma";
import { Meta } from ".prisma/client";

export async function getMetas(): Promise<Meta[]> {
  const res = await prisma.meta.findMany({
    select: { label: true, text: true },
  });
  return JSON.parse(JSON.stringify(res));
}
