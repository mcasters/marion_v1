import prisma from "@/lib/db/prisma";
import { deleteFile, getMiscellaneousDir } from "@/utils/serverUtils";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ filename: string }> },
) {
  try {
    const filename = (await params).filename;
    const dir = getMiscellaneousDir();

    const content = await prisma.content.findFirst({
      where: {
        images: {
          some: {
            filename,
          },
        },
      },
    });

    if (content) {
      deleteFile(dir, filename);
      await prisma.content.update({
        where: { id: content.id },
        data: {
          images: {
            delete: { filename },
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
