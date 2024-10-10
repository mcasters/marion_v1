import {
  deleteFile,
  getMiscellaneousDir,
  resizeAndSaveImage,
} from "@/utils/serverUtils";
import prisma from "@/lib/db/prisma";
import { auth } from "@/lib/auth";
import { Label } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();

  if (session) {
    try {
      const dir = getMiscellaneousDir();

      const formData = await req.formData();
      const label = formData.get("label") as Label;
      const BDContent = await prisma.content.findUnique({
        where: {
          label: label,
        },
        include: {
          images: {
            select: {
              filename: true,
            },
          },
        },
      });

      let content;
      // Content with only images (Label.SLIDER)
      if (label === Label.SLIDER) {
        if (!BDContent) {
          content = await prisma.content.create({
            data: {
              label: label,
              title: "",
              text: "",
            },
          });
        } else content = BDContent;

        const files = formData.getAll("files") as File[];
        for (const file of files) {
          if (file.size > 0) {
            const fileInfo = await resizeAndSaveImage(file, dir, true);
            if (fileInfo) {
              await prisma.content.update({
                where: { id: content.id },
                data: {
                  images: {
                    create: {
                      filename: fileInfo.filename,
                      width: fileInfo.width,
                      height: fileInfo.height,
                      isMain: formData.get("isMain") === "true",
                    },
                  },
                },
              });
            }
          }
        }
      } else {
        if (!BDContent) {
          content = await prisma.content.create({
            data: {
              label,
              title: "",
              text: formData.get("text") as string,
              images: {},
            },
            include: { images: true },
          });
        } else {
          content = await prisma.content.update({
            where: {
              id: BDContent.id,
            },
            data: {
              text: formData.get("text") as string,
            },
            include: { images: true },
          });
        }

        // Contents with one image (PRESENTATION)
        if (label === Label.PRESENTATION) {
          const file = formData.get("file") as File;
          if (file.size > 0) {
            if (content.images.length > 0) {
              const oldFilename = content.images[0].filename;
              deleteFile(dir, oldFilename);
              await prisma.content.update({
                where: { id: content.id },
                data: {
                  images: {
                    delete: { filename: oldFilename },
                  },
                },
              });
            }

            const fileInfo = await resizeAndSaveImage(file, dir);
            if (fileInfo) {
              await prisma.content.update({
                where: { id: content.id },
                data: {
                  images: {
                    create: {
                      filename: fileInfo.filename,
                      width: fileInfo.width,
                      height: fileInfo.height,
                    },
                  },
                },
              });
            }
          }
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
