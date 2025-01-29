"use server";

import {
  createDirIfNecessary,
  deleteFile,
  getDrawingDir,
  resizeAndSaveImage,
} from "@/utils/serverUtils";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { transformValueToKey } from "@/utils/commonUtils";

export async function createDrawing(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  const dir = getDrawingDir();
  createDirIfNecessary(dir);
  const rawFormData = Object.fromEntries(formData);
  const file = rawFormData.file;
  const title = rawFormData.title;
  const fileInfo = await resizeAndSaveImage(file, title, dir);

  try {
    if (fileInfo) {
      await prisma.drawing.create({
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
    revalidatePath("/admin/dessins");
    return { message: "Dessin ajouté", isError: false };
  } catch (e) {
    return { message: "Erreur à l'enregistrement", isError: true };
  }
}

export async function updateDrawing(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  const dir = getDrawingDir();
  const rawFormData = Object.fromEntries(formData);
  const id = Number(rawFormData.id);
  try {
    const oldDraw = await prisma.drawing.findUnique({
      where: { id },
    });

    if (oldDraw) {
      let fileInfo = null;
      const newFile = rawFormData.file as File;
      const title = rawFormData.title;
      if (newFile.size !== 0) {
        deleteFile(dir, oldDraw.images[0].filename);
        fileInfo = await resizeAndSaveImage(newFile, title, dir);
      }

      const category =
        rawFormData.categoryId !== ""
          ? {
              connect: {
                id: Number(rawFormData.categoryId),
              },
            }
          : oldDraw.categoryId !== null
            ? {
                disconnect: {
                  id: oldDraw.categoryId,
                },
              }
            : {};

      await prisma.drawing.update({
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
    revalidatePath("/admin/dessins");
    return { message: "Dessin modifié", isError: false };
  } catch (e) {
    return { message: "Erreur à l'enregistrement", isError: true };
  }
}

export async function deleteDrawing(id: number) {
  const dir = getDrawingDir();
  try {
    const drawing = await prisma.drawing.findUnique({
      where: { id },
    });
    if (drawing) {
      deleteFile(dir, drawing.images[0].filename);
      await prisma.drawing.delete({
        where: {
          id,
        },
      });
    }
    revalidatePath("/admin/dessins");
    return { message: "Dessin supprimé", isError: false };
  } catch (e) {
    return { message: "Erreur à la suppression", isError: true };
  }
}

export async function deleteCategoryDrawing(id: number) {
  try {
    await prisma.drawingCategory.delete({
      where: { id },
    });
    revalidatePath("/admin/dessins");
    return { message: "Catégorie supprimée", isError: false };
  } catch (e) {
    return { message: "Erreur à la suppression", isError: true };
  }
}

export async function createCategoryDrawing(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  try {
    const value = formData.get("text") as string;
    const key = transformValueToKey(value);

    await prisma.drawingCategory.create({
      data: {
        key,
        value,
      },
    });
    revalidatePath("/admin/dessins");
    return { message: "Catégorie ajoutée", isError: false };
  } catch (e) {
    return { message: "Erreur à la création", isError: true };
  }
}

export async function updateCategoryDrawing(
  prevState: { message: string; isError: boolean } | null,
  formData: FormData,
) {
  try {
    const rawFormData = Object.fromEntries(formData);
    const id = Number(rawFormData.id);
    const value = rawFormData.text as string;
    const key = transformValueToKey(value);

    await prisma.drawingCategory.update({
      where: { id },
      data: {
        key,
        value,
      },
    });
    revalidatePath("/admin/dessins");
    return { message: "Catégorie modifiée", isError: false };
  } catch (e) {
    return { message: "Erreur à la modification", isError: true };
  }
}
