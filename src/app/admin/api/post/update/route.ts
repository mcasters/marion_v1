import { parse } from "date-fns";

import {
  deleteFile,
  getPostDir,
  resizeAndSaveImage,
} from "@/utils/serverUtils";
import prisma from "@/lib/db/prisma";

export async function POST(req: Request) {
  try {
    const dir = getPostDir();

    const formData = await req.formData();
    const id = Number(formData.get("id"));
    const oldPost = await prisma.post.findUnique({
      where: { id },
      include: {
        images: {
          select: {
            filename: true,
            isMain: true,
          },
        },
      },
    });

    if (oldPost) {
      const mainFilenameToDelete = formData.get(
        "mainFilenameToDelete",
      ) as string;
      if (mainFilenameToDelete !== "") {
        if (deleteFile(dir, mainFilenameToDelete)) {
          await prisma.postImage.delete({
            where: { filename: mainFilenameToDelete },
          });
        }
      }
      const filenamesToDelete = formData.get("filenamesToDelete") as string;
      for await (const filename of filenamesToDelete.split(",")) {
        if (deleteFile(dir, filename)) {
          await prisma.postImage.delete({
            where: { filename },
          });
        }
      }

      const images = [];
      const mainFile = formData.get("file") as File;
      const title = formData.get("title") as string;
      if (mainFile.size > 0) {
        const fileInfo = await resizeAndSaveImage(mainFile, title, dir);
        if (fileInfo)
          images.push({
            filename: fileInfo.filename,
            width: fileInfo.width,
            height: fileInfo.height,
            isMain: true,
          });

        const oldMainImage = oldPost.images.filter((i) => i.isMain);
        if (oldMainImage.length > 0) {
          const filename = oldMainImage[0].filename;
          deleteFile(dir, filename);
          await prisma.post.update({
            where: { id },
            data: {
              images: {
                delete: { filename },
              },
            },
          });
        }
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

      await prisma.post.update({
        where: { id },
        data: {
          title,
          date: parse(formData.get("date") as string, "yyyy", new Date()),
          text: formData.get("text") as string,
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
