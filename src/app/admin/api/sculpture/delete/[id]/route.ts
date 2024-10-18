import prisma from "@/lib/db/prisma";
import { deleteFile, getSculptureDir } from "@/utils/serverUtils";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const dir = getSculptureDir();
  try {
    const id = Number(params.id);
    const sculpture = await prisma.sculpture.findUnique({
      where: { id },
      include: {
        images: {
          select: {
            filename: true,
          },
        },
      },
    });
    if (sculpture) {
      for (const image of sculpture.images) {
        deleteFile(dir, image.filename);
        await prisma.sculptureImage.delete({
          where: {
            filename: image.filename,
          },
        });
      }
      await prisma.sculpture.delete({
        where: {
          id,
        },
      });
    }

    return Response.json({ message: "ok" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json({ error: "Error" }, { status: 404 });
  }
}
