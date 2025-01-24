import {
  deleteFile,
  getPaintingDir,
  resizeAndSaveImage,
} from "@/utils/serverUtils";
import prisma from "@/lib/db/prisma";

export async function POST(req: Request) {
  try {
    const dir = getPaintingDir();

    const formData = await req.formData();
    const id = Number(formData.get("id"));
    const oldPaint = await prisma.painting.findUnique({
      where: { id },
    });

    if (oldPaint) {
      let fileInfo = null;
      const newFile = formData.get("file") as File;
      const title = formData.get("title") as string;
      if (newFile.size !== 0) {
        deleteFile(dir, oldPaint.images[0].filename);
        fileInfo = await resizeAndSaveImage(newFile, title, dir);
      }

      const category =
        formData.get("categoryId") !== ""
          ? {
              connect: {
                id: Number(formData.get("categoryId")),
              },
            }
          : oldPaint.categoryId !== null
            ? {
                disconnect: {
                  id: oldPaint.categoryId,
                },
              }
            : {};

      await prisma.painting.update({
        where: { id: id },
        data: {
          title,
          date: new Date(Number(formData.get("date")), 1),
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
    return Response.json({ message: "ok" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json({ error: "Error" }, { status: 404 });
  }
}
