import prisma from "@/lib/db/prisma";
import { deleteFile, getPostDir } from "@/utils/serverUtils";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const dir = getPostDir();
  try {
    const id = Number(params.id);
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        images: {
          select: {
            filename: true,
          },
        },
      },
    });

    if (post) {
      for (const image of post.images) {
        deleteFile(dir, image.filename);
      }
      await prisma.post.update({
        where: { id },
        data: {
          images: {
            delete: post.images,
          },
        },
      });
      await prisma.post.delete({
        where: { id },
      });
    }
    return Response.json({ message: "ok" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json({ error: "Error" }, { status: 404 });
  }
}
