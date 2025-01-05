import prisma from "@/lib/db/prisma";
import { deleteFile, getPaintingDir } from "@/utils/serverUtils";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const dir = getPaintingDir();
  try {
    const id = Number((await params).id);
    const painting = await prisma.painting.findUnique({
      where: { id },
    });
    if (painting) {
      const filename = painting.imageFilename;
      deleteFile(dir, filename);
      await prisma.painting.delete({
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
