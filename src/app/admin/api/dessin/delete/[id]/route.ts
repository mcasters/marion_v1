import prisma from "@/lib/db/prisma";
import { deleteFile, getDrawingDir } from "@/utils/serverUtils";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const dir = getDrawingDir();
  try {
    const id = Number((await params).id);
    const drawing = await prisma.drawing.findUnique({
      where: { id },
    });
    if (drawing) {
      const filename = drawing.imageFilename;
      deleteFile(dir, filename);
      await prisma.drawing.delete({
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
