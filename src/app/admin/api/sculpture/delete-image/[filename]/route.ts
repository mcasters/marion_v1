import prisma from "@/lib/db/prisma";
import { deleteFile, getSculptureDir } from "@/utils/serverUtils";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ filename: string }> },
) {
  try {
    const dir = getSculptureDir();
    const filename = (await params).filename;

    if (deleteFile(dir, filename)) {
      await prisma.sculptureImage.delete({
        where: { filename },
      });
    }
    return Response.json({ message: "ok" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json({ error: "Error" }, { status: 404 });
  }
}
