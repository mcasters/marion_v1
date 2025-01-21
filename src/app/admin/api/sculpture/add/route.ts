import { parse } from "date-fns";
import prisma from "@/lib/db/prisma";
import {
  createDirIfNecessary,
  getSculptureDir,
  resizeAndSaveImage,
} from "@/utils/serverUtils";

export async function POST(req: Request) {
  try {
    const dir = getSculptureDir();
    createDirIfNecessary(dir);
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const title = formData.get("title") as string;
    const images = [];
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
    await prisma.sculpture.create({
      data: {
        title,
        date: parse(formData.get("date") as string, "yyyy", new Date()),
        technique: formData.get("technique") as string,
        description: formData.get("description") as string,
        height: Number(formData.get("height")),
        width: Number(formData.get("width")),
        length: Number(formData.get("length")),
        isToSell: formData.get("isToSell") === "true",
        price: Number(formData.get("price")),
        category:
          formData.get("categoryId") === ""
            ? {}
            : {
                connect: {
                  id: Number(formData.get("categoryId")),
                },
              },
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
