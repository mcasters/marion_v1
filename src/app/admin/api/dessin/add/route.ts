import { parse } from "date-fns";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

import {
  createDirIfNecessary,
  getDrawingDir,
  resizeAndSaveImage,
} from "@/utils/serverUtils";
import { authOptions } from "@/utils/authOptions";
import prisma from "@/lib/db/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const dir = getDrawingDir();
      createDirIfNecessary(dir);
      const formData = await req.formData();
      const file = formData.get("file");
      const fileInfo = await resizeAndSaveImage(file, dir);
      if (fileInfo) {
        const newPainting = await prisma.drawing.create({
          data: {
            title: formData.get("title") as string,
            date: parse(formData.get("date") as string, "yyyy", new Date()),
            technique: formData.get("technique") as string,
            description: formData.get("description") as string,
            height: Number(formData.get("height")),
            width: Number(formData.get("width")),
            isToSell: formData.get("isToSell") === "true",
            price: Number(formData.get("price")),
            imageFilename: fileInfo.filename,
            imageWidth: fileInfo.width,
            imageHeight: fileInfo.height,
            category:
              formData.get("categoryId") === ""
                ? {}
                : {
                    connect: {
                      id: Number(formData.get("categoryId")),
                    },
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
