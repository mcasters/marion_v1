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
  const file = rawFormData.file as File;
  const title = rawFormData.title as string;
  const fileInfo = await resizeAndSaveImage(file, title, dir);

  try {
    if (fileInfo) {
      await prisma.drawing.create({
        data: {
          title,
          date: new Date(Number(rawFormData.date), 1),
          technique: rawFormData.technique as string,
          description: rawFormData.description as string,
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
      const title = rawFormData.title as string;
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
          technique: rawFormData.technique as string,
          description: rawFormData.description as string,
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
    const cat = await prisma.drawingCategory.findUnique({
      where: { id },
    });

    const contentId = cat.categoryContentId;
    if (contentId) {
      await prisma.categoryContent.delete({
        where: { id: contentId },
      });
    }

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
  const rawFormData = Object.fromEntries(formData);
  const value = rawFormData.value as string;

  try {
    await prisma.drawingCategory.create({
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
  const rawFormData = Object.fromEntries(formData);
  const id = Number(rawFormData.id);
  const value = rawFormData.value as string;

  try {
    const oldCat = await prisma.drawingCategory.findUnique({
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

      await prisma.drawingCategory.update({
        where: { id },
        data: {
          key: transformValueToKey(value),
          value,
          content,
        },
      });
    }

    revalidatePath("/admin/dessins");
    return { message: "Catégorie modifiée", isError: false };
  } catch (e) {
    return { message: "Erreur à la modification", isError: true };
  }
}
