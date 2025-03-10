"use server";

import {
  deleteFile,
  getMiscellaneousDir,
  resizeAndSaveImage,
} from "@/utils/serverUtils";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Label } from "@prisma/client";

export async function updateContent(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  try {
    const dir = getMiscellaneousDir();
    const label = formData.get("label") as Label;

    let BDContent = await prisma.content.findUnique({
      where: {
        label,
      },
      include: {
        images: {
          select: {
            filename: true,
          },
        },
      },
    });

    if (!BDContent) {
      BDContent = await prisma.content.create({
        data: {
          label,
          title: "",
          text: formData.get("text") as string | "",
          images: {},
        },
        include: { images: true },
      });
    }

    const id = BDContent.id;

    // Content with only images (Label.SLIDER)
    if (label === Label.SLIDER) {
      const files = formData.getAll("files") as File[];
      for (const file of files) {
        if (file.size > 0) {
          const isMain = formData.get("isMain") === "true";
          const title = isMain ? "mobileSlider" : "desktopSlider";
          const fileInfo = await resizeAndSaveImage(file, title, dir);
          if (fileInfo) {
            await prisma.content.update({
              where: { id },
              data: {
                images: {
                  create: {
                    filename: fileInfo.filename,
                    width: fileInfo.width,
                    height: fileInfo.height,
                    isMain,
                  },
                },
              },
            });
          }
        }
      }
    } else {
      const file = formData.get("file") as File;
      if (label === Label.PRESENTATION && file) {
        // Contents with only one image (Image PRESENTATION)
        if (file && file.size > 0) {
          if (BDContent.images.length > 0) {
            const oldFilename = BDContent.images[0].filename;
            deleteFile(dir, oldFilename);
            await prisma.content.update({
              where: { id },
              data: {
                images: {
                  delete: { filename: oldFilename },
                },
              },
            });
          }
          const fileInfo = await resizeAndSaveImage(file, "presentation", dir);
          if (fileInfo) {
            await prisma.content.update({
              where: { id },
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
      } else {
        await prisma.content.update({
          where: {
            id,
          },
          data: {
            text: formData.get("text") as string,
          },
          include: { images: true },
        });
      }
    }

    const path =
      label === Label.SLIDER
        ? "/admin/home"
        : label === Label.PRESENTATION
          ? "/admin/presentation"
          : "/admin/contact";
    revalidatePath(path);
    return { message: "Contenu modifié", isError: false };
  } catch (e) {
    return { message: "Erreur à l'enregistrement", isError: true };
  }
}

export async function deleteContentImage(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  const dir = getMiscellaneousDir();
  const filename = formData.get("filename") as string;

  try {
    if (filename) {
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
    }
    const label = formData.get("label");
    const path =
      label === Label.SLIDER
        ? "/admin/home"
        : label === Label.PRESENTATION
          ? "/admin/presentation"
          : "/admin/contact";
    revalidatePath(path);
    return { message: "Image supprimée", isError: false };
  } catch (e) {
    return { message: "Erreur à la suppression", isError: true };
  }
}
