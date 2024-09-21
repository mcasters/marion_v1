import { getServerSession } from "next-auth/next";

import prisma from "@/lib/db/prisma";
import { authOptions } from "@/utils/authOptions";
import { deleteFile, getMiscellaneousDir } from "@/utils/serverUtils";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { filename: string } },
) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const filename = params.filename;
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
      return NextResponse.json({ message: "ok" }, { status: 200 });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: "Error" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
