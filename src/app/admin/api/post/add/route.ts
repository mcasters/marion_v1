import { parse } from "date-fns";

import prisma from "@/lib/db/prisma";
import {
  createDirIfNecessary,
  getPostDir,
  resizeAndSaveImage,
} from "@/utils/serverUtils";

export async function POST(req: Request) {
  try {
    const dir = getPostDir();
    createDirIfNecessary(dir);
    const formData = await req.formData();

    const mainFile = formData.get("file") as File;
    const title = formData.get("title") as string;
    const images = [];
    if (mainFile.size > 0) {
      const fileInfo = await resizeAndSaveImage(mainFile, title, dir);
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
        const fileInfo = await resizeAndSaveImage(file, title, dir);
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
        title,
        date: parse(formData.get("date") as string, "yyyy", new Date()),
        text: formData.get("text") as string,
        images: {
          create: images,
        },
      },
    });

    return Response.json({ message: "ok" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json({ error: "Error" }, { status: 404 });
  }
}
