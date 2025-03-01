"use server";
import prisma from "@/lib/prisma";
import { Meta } from ".prisma/client";

export async function getMetas(): Promise<Meta[]> {
  const res = await prisma.meta.findMany();
  return JSON.parse(JSON.stringify(res));
}

export async function getMetaByLabel(label: string): Promise<string> {
  const meta = await prisma.meta.findUnique({
    where: {
      label,
    },
  });
  return JSON.parse(JSON.stringify(meta.text));
}
