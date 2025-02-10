"use server";

import {
  createDirIfNecessary,
  deleteFile,
  getSculptureDir,
  resizeAndSaveImage,
} from "@/utils/serverUtils";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { transformValueToKey } from "@/utils/commonUtils";

export async function createSculpture(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  const dir = getSculptureDir();
  createDirIfNecessary(dir);
  const rawFormData = Object.fromEntries(formData);
  const files = formData.getAll("files") as File[];
  const title = rawFormData.title as string;
  const images = [];
  for (const file of files) {
    if (file.size > 0) {
      const fileInfo = await resizeAndSaveImage(file, title, dir);
      if (fileInfo)
        images.push({
          filename: fileInfo.filename,
          width: fileInfo.width,
          height: fileInfo.height,
        });
    }
  }

  if (images.length) {
    try {
      await prisma.sculpture.create({
        data: {
          title,
          date: new Date(Number(rawFormData.date), 1),
          technique: rawFormData.technique as string,
          description: rawFormData.description as string,
          height: Number(rawFormData.height),
          width: Number(rawFormData.width),
          length: Number(rawFormData.length),
          isToSell: rawFormData.isToSell === "true",
          price: Number(rawFormData.price),
          category:
            rawFormData.categoryId === ""
              ? {}
              : {
                  connect: {
                    id: Number(rawFormData.categoryId),
                  },
                },
          images: {
            create: images,
          },
        },
      });

      revalidatePath("/admin/sculptures");
      return { message: "Sculpture ajoutée", isError: false };
    } catch (e) {
      return { message: "Erreur à l'enregistrement", isError: true };
    }
  } else {
    return { message: "Erreur à l'enregistrement des images", isError: true };
  }
}

export async function updateSculpture(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  const dir = getSculptureDir();
  const rawFormData = Object.fromEntries(formData);
  const id = Number(rawFormData.id);
  try {
    const oldSculpt = await prisma.sculpture.findUnique({
      where: { id },
      include: { category: true },
    });

    if (oldSculpt) {
      const filenamesToDelete = rawFormData.filenamesToDelete as string;
      if (filenamesToDelete) {
        for await (const filename of filenamesToDelete.split(",")) {
          if (deleteFile(dir, filename)) {
            await prisma.sculptureImage.delete({
              where: { filename },
            });
          }
        }
      }

      const files = formData.getAll("files") as File[];
      const title = rawFormData.title as string;
      const images = [];
      for (const file of files) {
        if (file.size > 0) {
          const fileInfo = await resizeAndSaveImage(file, title, dir);
          if (fileInfo)
            images.push({
              filename: fileInfo.filename,
              width: fileInfo.width,
              height: fileInfo.height,
            });
        }
      }

      const category =
        rawFormData.categoryId !== ""
          ? {
              connect: {
                id: Number(rawFormData.categoryId),
              },
            }
          : oldSculpt.categoryId
            ? {
                disconnect: {
                  id: oldSculpt.categoryId,
                },
              }
            : {};

      await prisma.sculpture.update({
        where: { id: id },
        data: {
          title,
          date: new Date(Number(rawFormData.date), 1),
          technique: rawFormData.technique as string,
          description: rawFormData.description as string,
          height: Number(rawFormData.height),
          width: Number(rawFormData.width),
          length: Number(rawFormData.length),
          isToSell: rawFormData.isToSell === "true",
          price: Number(rawFormData.price),
          category,
          images: {
            create: images,
          },
        },
      });
    }
    revalidatePath("/admin/sculptures");
    return { message: "Sculpture modifiée", isError: false };
  } catch (e) {
    return { message: "Erreur à la suppression", isError: true };
  }
}

export async function deleteSculpture(id: number) {
  const dir = getSculptureDir();
  try {
    const sculpture = await prisma.sculpture.findUnique({
      where: { id },
      include: {
        images: {
          select: {
            filename: true,
          },
        },
      },
    });
    if (sculpture) {
      for (const image of sculpture.images) {
        deleteFile(dir, image.filename);
        await prisma.sculptureImage.delete({
          where: {
            filename: image.filename,
          },
        });
      }
      await prisma.sculpture.delete({
        where: {
          id,
        },
      });
    }

    revalidatePath("/admin/sculptures");
    return { message: "Sculpture supprimée", isError: false };
  } catch (e) {
    return { message: "Erreur à la suppression", isError: true };
  }
}

export async function deleteCategorySculpture(id: number) {
  try {
    const cat = await prisma.sculptureCategory.findUnique({
      where: { id },
    });

    if (cat) {
      const contentId = cat.categoryContentId;
      if (contentId) {
        await prisma.categoryContent.delete({
          where: { id: contentId },
        });
      }

      await prisma.sculptureCategory.delete({
        where: { id },
      });
    }
    revalidatePath("/admin/sculptures");
    return { message: "Catégorie supprimée", isError: false };
  } catch (e) {
    return { message: "Erreur à la suppression", isError: true };
  }
}

export async function createCategorySculpture(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  const rawFormData = Object.fromEntries(formData);
  const value = rawFormData.value as string;

  try {
    await prisma.sculptureCategory.create({
      data: {
        key: transformValueToKey(value),
        value,
        content: {
          create: {
            title: rawFormData.title as string,
            text: rawFormData.text as string,
            imageFilename: rawFormData.filename as string,
            imageWidth: Number(rawFormData.width),
            imageHeight: Number(rawFormData.height),
          },
        },
      },
    });

    revalidatePath("/admin/sculptures");
    return { message: "Catégorie ajoutée", isError: false };
  } catch (e) {
    return { message: "Erreur à la création", isError: true };
  }
}

export async function updateCategorySculpture(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  const rawFormData = Object.fromEntries(formData);
  const id = Number(rawFormData.id);
  const value = rawFormData.value as string;
  try {
    const oldCat = await prisma.sculptureCategory.findUnique({
      where: { id },
      include: { content: true },
    });

    if (oldCat) {
      let content;
      const data = {
        title: rawFormData.title as string,
        text: rawFormData.text as string,
        imageFilename: rawFormData.filename as string,
        imageWidth: Number(rawFormData.width),
        imageHeight: Number(rawFormData.height),
      };

      if (!oldCat.content) {
        content = {
          create: data,
        };
      } else {
        content = {
          update: data,
        };
      }

      await prisma.sculptureCategory.update({
        where: { id },
        data: {
          key: transformValueToKey(value),
          value,
          content,
        },
      });
    }
    revalidatePath("/admin/sculpture");
    return { message: "Catégorie modifiée", isError: false };
  } catch (e) {
    return { message: "Erreur à la modification", isError: true };
  }
}
