import prisma from "@/lib/db/prisma";
import { deleteFile, getPostDir } from "@/utils/serverUtils";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ filename: string }> },
) {
  try {
    const filename = (await params).filename;
    const dir = getPostDir();

    const post = await prisma.post.findFirst({
      where: {
        images: {
          some: {
            filename,
          },
        },
      },
    });

    if (post) {
      if (deleteFile(dir, filename)) {
        await prisma.post.update({
          where: { id: post.id },
          data: {
            images: {
              delete: { filename },
            },
          },
        });
      }
    }
    return Response.json({ message: "ok" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json({ error: "Error" }, { status: 404 });
  }
}
