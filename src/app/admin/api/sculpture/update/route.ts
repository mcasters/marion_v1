import { parse } from "date-fns";

import {
  deleteFile,
  getSculptureDir,
  resizeAndSaveImage,
} from "@/utils/serverUtils";
import prisma from "@/lib/db/prisma";

export async function POST(req: Request) {
  try {
    const dir = getSculptureDir();

    const formData = await req.formData();
    const id = Number(formData.get("id"));
    const oldSculpt = await prisma.sculpture.findUnique({
      where: { id },
    });

    if (oldSculpt) {
      const filenamesToDelete = formData.get("filenamesToDelete") as string;
      for await (const filename of filenamesToDelete.split(",")) {
        if (deleteFile(dir, filename)) {
          await prisma.sculptureImage.delete({
            where: { filename },
          });
        }
      }

      const files = formData.getAll("files") as File[];
      const title = formData.get("title") as string;
      let images = [];
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
          title,
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
    return Response.json({ message: "ok" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json({ error: "Error" }, { status: 404 });
  }
}
