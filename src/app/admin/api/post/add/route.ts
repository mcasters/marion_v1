import { parse } from "date-fns";
import prisma from "@/lib/db/prisma";
import {
  createDirIfNecessary,
  getPostDir,
  resizeAndSaveImage,
} from "@/utils/serverUtils";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();

  if (session) {
    try {
      const dir = getPostDir();
      createDirIfNecessary(dir);
      const formData = await req.formData();

      const mainFile = formData.get("file") as File;
      let images = [];
      if (mainFile.size > 0) {
        const fileInfo = await resizeAndSaveImage(mainFile, dir);
        if (fileInfo)
          images.push({
            filename: fileInfo.filename,
            width: fileInfo.width,
            height: fileInfo.height,
            isMain: true,
          });
      }
      const files = formData.getAll("files") as File[];
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

      await prisma.post.create({
        data: {
          title: formData.get("title") as string,
          date: parse(formData.get("date") as string, "yyyy", new Date()),
          text: formData.get("text") as string,
          images: {
            create: images,
          },
        },
      });

      return NextResponse.json({ message: "ok" }, { status: 200 });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: "Error" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
