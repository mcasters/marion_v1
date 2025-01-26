"use server";

import {
  createDirIfNecessary,
  deleteFile,
  getPaintingDir,
  resizeAndSaveImage,
} from "@/utils/serverUtils";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { transformValueToKey } from "@/utils/commonUtils";

export async function createPainting(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  const dir = getPaintingDir();
  createDirIfNecessary(dir);
  const rawFormData = Object.fromEntries(formData);
  const file = rawFormData.file;
  const title = rawFormData.title;
  const fileInfo = await resizeAndSaveImage(file, title, dir);

  try {
    if (fileInfo) {
      await prisma.painting.create({
        data: {
          title,
          date: new Date(Number(rawFormData.date), 1),
          technique: rawFormData.technique,
          description: rawFormData.description,
          height: Number(rawFormData.height),
          width: Number(rawFormData.width),
          isToSell: rawFormData.isToSell === "true",
          price: Number(rawFormData.price),
          imageFilename: fileInfo.filename,
          imageWidth: fileInfo.width,
          imageHeight: fileInfo.height,
          category:
            rawFormData.categoryId === ""
              ? {}
              : {
                  connect: {
                    id: Number(rawFormData.categoryId),
                  },
                },
        },
      });
    }
    revalidatePath("/admin/peintures");
    return { message: "Peinture ajoutée", isError: false };
  } catch (e) {
    return { message: "Erreur à l'enregistrement", isError: true };
  }
}

export async function updatePainting(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  const dir = getPaintingDir();
  const rawFormData = Object.fromEntries(formData);
  const id = Number(rawFormData.id);
  try {
    const oldPaint = await prisma.painting.findUnique({
      where: { id },
    });

    if (oldPaint) {
      let fileInfo = null;
      const newFile = rawFormData.file as File;
      const title = rawFormData.title;
      if (newFile.size > 0) {
        deleteFile(dir, oldPaint.images[0].filename);
        fileInfo = await resizeAndSaveImage(newFile, title, dir);
      }

      const category =
        rawFormData.categoryId !== ""
          ? {
              connect: {
                id: Number(rawFormData.categoryId),
              },
            }
          : oldPaint.categoryId !== null
            ? {
                disconnect: {
                  id: oldPaint.categoryId,
                },
              }
            : {};

      await prisma.painting.update({
        where: { id: id },
        data: {
          title,
          date: new Date(Number(rawFormData.date), 1),
          technique: rawFormData.technique,
          description: rawFormData.description,
          height: Number(rawFormData.height),
          width: Number(rawFormData.width),
          isToSell: rawFormData.isToSell === "true",
          price: Number(rawFormData.price),
          imageFilename: fileInfo ? fileInfo.filename : undefined,
          imageWidth: fileInfo ? fileInfo.width : undefined,
          imageHeight: fileInfo ? fileInfo.height : undefined,
          category,
        },
      });
    }
    revalidatePath("/admin/peintures");
    return { message: "Peinture modifiée", isError: false };
  } catch (e) {
    return { message: "Erreur à l'enregistrement", isError: true };
  }
}

export async function deletePainting(id: number) {
  const dir = getPaintingDir();
  try {
    const painting = await prisma.painting.findUnique({
      where: { id },
    });
    if (painting) {
      deleteFile(dir, painting.images[0].filename);
      await prisma.painting.delete({
        where: {
          id,
        },
      });
    }
    revalidatePath("/admin/peintures");
    return { message: "Peinture supprimée", isError: false };
  } catch (e) {
    return { message: "Erreur à la suppression", isError: true };
  }
}

export async function deleteCategoryPainting(id: number) {
  try {
    await prisma.paintingCategory.delete({
      where: { id },
    });
    revalidatePath("/admin/peintures");
    return { message: "Catégorie supprimée", isError: false };
  } catch (e) {
    return { message: "Erreur à la suppression", isError: true };
  }
}

export async function createCategoryPainting(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  try {
    const value = formData.get("text") as string;
    const key = transformValueToKey(value);

    await prisma.paintingCategory.create({
      data: {
        key,
        value,
      },
    });
    revalidatePath("/admin/peintures");
    return { message: "Catégorie ajoutée", isError: false };
  } catch (e) {
    return { message: "Erreur à la création", isError: true };
  }
}

export async function updateCategoryPainting(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  try {
    const rawFormData = Object.fromEntries(formData);
    const id = Number(rawFormData.id);
    const value = rawFormData.text as string;
    const key = transformValueToKey(value);

    await prisma.paintingCategory.update({
      where: { id },
      data: {
        key,
        value,
      },
    });
    revalidatePath("/admin/peintures");
    return { message: "Catégorie modifiée", isError: false };
  } catch (e) {
    return { message: "Erreur à la modification", isError: true };
  }
}
