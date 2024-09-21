import { getServerSession } from "next-auth/next";
import prisma from "@/lib/db/prisma";
import { deleteFile, getPostDir } from "@/utils/serverUtils";
import { authOptions } from "@/utils/authOptions";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (session) {
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
      return NextResponse.json({ message: "ok" });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: "Error" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
