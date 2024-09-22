import { parse } from "date-fns";
import { getServerSession } from "next-auth/next";

import {
  deleteFile,
  getDrawingDir,
  resizeAndSaveImage,
} from "@/utils/serverUtils";
import prisma from "@/lib/db/prisma";
import { authOptions } from "@/utils/authOptions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const dir = getDrawingDir();

      const formData = await req.formData();
      const id = Number(formData.get("id"));
      const oldDraw = await prisma.drawing.findUnique({
        where: { id },
      });

      if (oldDraw) {
        let fileInfo = null;
        const newFile = formData.get("file") as File;
        if (newFile.size !== 0) {
          deleteFile(dir, oldDraw.imageFilename);
          fileInfo = await resizeAndSaveImage(newFile, dir);
        }

        const category =
          formData.get("categoryId") !== ""
            ? {
                connect: {
                  id: Number(formData.get("categoryId")),
                },
              }
            : oldDraw.categoryId !== null
              ? {
                  disconnect: {
                    id: oldDraw.categoryId,
                  },
                }
              : {};

        await prisma.drawing.update({
          where: { id: id },
          data: {
            title: formData.get("title") as string,
            date: parse(formData.get("date") as string, "yyyy", new Date()),
            technique: formData.get("technique") as string,
            description: formData.get("description") as string,
            height: Number(formData.get("height")),
            width: Number(formData.get("width")),
            isToSell: formData.get("isToSell") === "true",
            price: Number(formData.get("price")),
            imageFilename: fileInfo ? fileInfo.filename : undefined,
            imageWidth: fileInfo ? fileInfo.width : undefined,
            imageHeight: fileInfo ? fileInfo.height : undefined,
            category,
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
