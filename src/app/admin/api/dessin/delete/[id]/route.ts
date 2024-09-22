import { getServerSession } from "next-auth/next";
import prisma from "@/lib/db/prisma";
import { deleteFile, getDrawingDir } from "@/utils/serverUtils";
import { authOptions } from "@/utils/authOptions";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (session) {
    const dir = getDrawingDir();
    try {
      const id = Number(params.id);
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
      return NextResponse.json({ message: "ok" });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: "Error" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
