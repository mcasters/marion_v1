import { getServerSession } from "next-auth/next";

import prisma from "@/lib/db/prisma";
import { authOptions } from "@/utils/authOptions";
import { deleteFile, getPostDir } from "@/utils/serverUtils";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { filename: string } },
) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const filename = params.filename;
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
      return NextResponse.json({ message: "ok" }, { status: 200 });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: "Error" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
