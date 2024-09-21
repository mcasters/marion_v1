import { parse } from "date-fns";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

import { getSculptureDir, resizeAndSaveImage } from "@/utils/serverUtils";
import prisma from "@/lib/db/prisma";
import { authOptions } from "@/utils/authOptions";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const dir = getSculptureDir();

      const formData = await req.formData();
      const id = Number(formData.get("id"));
      const oldSculpt = await prisma.sculpture.findUnique({
        where: { id },
      });

      if (oldSculpt) {
        const files = formData.getAll("files") as File[];
        let images = [];
        for (const file of files) {
          if (file.size > 0) {
            const fileInfo = await resizeAndSaveImage(file, dir);
            if (fileInfo)
              images.push({
                filename: fileInfo.filename,
                width: fileInfo.width,
                height: fileInfo.height,
              });
          }
        }

        const category =
          formData.get("categoryId") !== ""
            ? {
                connect: {
                  id: Number(formData.get("categoryId")),
                },
              }
            : oldSculpt.categoryId !== null
            ? {
                disconnect: {
                  id: oldSculpt.categoryId,
                },
              }
            : {};

        await prisma.sculpture.update({
          where: { id: id },
          data: {
            title: formData.get("title") as string,
            date: parse(formData.get("date") as string, "yyyy", new Date()),
            technique: formData.get("technique") as string,
            description: formData.get("description") as string,
            height: Number(formData.get("height")),
            width: Number(formData.get("width")),
            length: Number(formData.get("length")),
            isToSell: formData.get("isToSell") === "true",
            price: Number(formData.get("price")),
            category,
            images: {
              create: images,
            },
          },
        });
      }
      return NextResponse.json({ message: "ok" }, { status: 200 });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: "Error" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
