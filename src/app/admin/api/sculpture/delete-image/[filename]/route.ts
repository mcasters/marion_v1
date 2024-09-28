import prisma from "@/lib/db/prisma";
import { auth } from "@/lib/auth";
import { deleteFile, getSculptureDir } from "@/utils/serverUtils";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { filename: string } },
) {
  const session = await auth();

  if (session) {
    try {
      const dir = getSculptureDir();
      const filename = params.filename;

      if (deleteFile(dir, filename)) {
        await prisma.sculptureImage.delete({
          where: { filename },
        });
      }
      return NextResponse.json({ message: "ok" }, { status: 200 });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: "Error" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
