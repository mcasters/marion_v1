import {
  createDirIfNecessary,
  getDrawingDir,
  resizeAndSaveImage,
} from "@/utils/serverUtils";
import prisma from "@/lib/db/prisma";

export async function POST(req: Request) {
  try {
    const dir = getDrawingDir();
    createDirIfNecessary(dir);
    const formData = await req.formData();
    const file = formData.get("file");
    const title = formData.get("title") as string;
    const fileInfo = await resizeAndSaveImage(file, title, dir);
    if (fileInfo) {
      await prisma.drawing.create({
        data: {
          title,
          date: new Date(Number(formData.get("date")), 1),
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

    return Response.json({ message: "ok" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json({ error: "Error" }, { status: 404 });
  }
}
