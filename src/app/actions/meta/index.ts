"use server";
import prisma from "@/lib/prisma";
import { Meta } from ".prisma/client";
import { cacheDBDatas } from "@/app/actions/actionUtils";

export async function getMetas(): Promise<Meta[]> {
  const metas = await cacheDBDatas(() => queryMetas(), "metas");

  return JSON.parse(JSON.stringify(metas));
}

const queryMetas = async (): Promise<Meta[]> => {
  return await prisma.meta.findMany();
};
